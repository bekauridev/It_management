// !! add work history and service history data too
// !! გატესტე ყველაფერიი
// !! როცა სერვისი განახლდება მუშასაც და კლიენტსაც lastService უნდა განუახლდეს
// !! თუ რამე error გვაქ ყველაფერი ორიგინალზე უნდა დაბრუნდეს
// დამატება მუშაობს მაგრამ სახელები არ ჩანს 1 მეორე როცა თანამშრომელს დაამატებ მომხმარებლის თავიდან დამატება გიწევს
import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Typography,
  Select,
  Option,
} from "@mui/joy";
import { fetchRequest } from "../utils/fetchRequest";
import Spinner from "./ui/Spinner";
import { cloneDeep, isEqual, get } from "lodash";
import {
  MdAssignmentTurnedIn,
  MdDelete,
  MdEdit,
  MdHistory,
} from "react-icons/md";
import AlertMessage from "./AlertMessage";
import { FaArrowLeft } from "react-icons/fa";
import formatTimeAgo from "../utils/formatTimeAgo";

// Field configuration for each viewType
const fieldConfig = {
  employees: ["name", "phone", "email", "notes"],
  customers: ["name", "phone", "notes"],
  services: ["employee", "customer", "serviceDetails", "date", "feedback"],
};

const EditModal = ({ isOpen, setIsOpen, dataId, viewType, onFakeRefresh }) => {
  const [originalData, setOriginalData] = useState(null); // Original data from the server

  const [editedData, setEditedData] = useState(null); // Data being edited
  console.log("editedData", editedData);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(false); // Loader for fetching data
  const [saving, setSaving] = useState(false); // Loader for saving changes
  const [deleting, setDeleting] = useState(false); // Loader for deletion

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [disabled, setDisabled] = useState(true); // Toggle edit mode

  // Fetch data when modal opens
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen || !dataId || !viewType) return;

      // Avoid duplicate fetching and set editable copy to view data
      if (originalData && dataId === originalData._id) {
        setEditedData(cloneDeep(originalData)); // Create editable copy
        return; // Avoid duplicate fetching
      }

      setLoading(true);
      setError(null);

      try {
        const { data } = await fetchRequest(`${viewType}/${dataId}`, "GET");
        console.log(data);
        setOriginalData(data.doc); // Set original data
        console.log(data.doc);
        setEditedData(data.doc); // Create editable copy
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    setSuccess(null);
    setDisabled(true);
    fetchData();
  }, [isOpen, dataId, viewType, originalData]);

  // Handle input changes we change edit data order to during saving detect changes made or not and have undo ability
  const handleChange = (e) => {
    console.log(`handleChange is on`);
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save
  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    if (isEqual(originalData, editedData)) {
      setError("No changes were made.");
      return;
    }

    setSaving(true);

    try {
      const { data, status } = await fetchRequest(
        `${viewType}/${dataId}`,
        "PATCH",
        editedData
      );

      if (status === "success") setSuccess("Data saved successfully!"); // Display success message

      // Delay to allow the success message to display
      setTimeout(() => {
        setOriginalData(data.doc); // Update original data
        onFakeRefresh(); // Refresh the parent component
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to save data"); // Display error if save fails
    } finally {
      setSaving(false); // Stop saving loader
      setDisabled(true); // Lock inputs
    }
  };

  // Handle delete
  const handleDelete = async () => {
    setError(null);
    setSuccess(null);
    setDeleting(true);

    try {
      await fetchRequest(`${viewType}/${dataId}`, "DELETE");
      setSuccess("Data deleted successfully");
      setTimeout(() => {
        setIsOpen(false); // Close modal after 2 seconds
        setOriginalData(null);
        setEditedData(null);
        onFakeRefresh();
      }, 1000);
    } catch (err) {
      console.log(err);
      setError(err.message || "Failed to delete data");
    } finally {
      setDeleting(false);
    }
  };

  // Handle undo
  const handleUndo = () => {
    setEditedData(cloneDeep(originalData)); // Restore original data
    setEmployees(null);
    setCustomers(null);
    setError(null); // Clear any error messages
    setDisabled(true);
  };

  // Handle modal close
  const onClose = () => {
    setIsOpen(false);
    // Clear all chnages
    setEditedData(null);
  };

  const selectChangeHandler = async (e) => {
    const { name } = e.target;
    try {
      setSaving(true);
      setError(null);
      const from = name === "employee" ? "employees" : "customers";
      const url = `${from}?active=true`;
      const { data } = await fetchRequest(url, "GET");
      if (data && from === "employees") setEmployees(data.doc);
      if (data && from === "customers") setCustomers(data.doc);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  // Get the allowed fields for the current viewType
  const allowedFields = useMemo(() => fieldConfig[viewType] || [], [viewType]);

  //  Returns an array of options for the select field specified by the key.
  const getOptions = (key, employees, customers, originalData) => {
    if (key === "employee" && employees) return employees;
    if (key === "customer" && customers) return customers;

    if (originalData && originalData[key]) {
      return [
        {
          _id: originalData[key]._id,
          name: originalData[key].name,
          servicesQuantity: originalData[key].servicesQuantity,
          latestService: originalData[key].latestService,
        },
      ];
    }

    return [];
  };

  return (
    <>
      {/* Success and error messages */}
      {error && <AlertMessage color="danger" message={error} />}
      {success && <AlertMessage color="success" message={success} />}

      {/* Modal content */}
      <Modal
        open={isOpen}
        onClose={onClose}
        sx={{ backdropFilter: "blur(10px)", paddingTop: "10vh" }}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: 1,
            backgroundColor: "background.level1",
            maxWidth: 500,
            margin: "auto",
            maxHeight: "90vh",
            overflowY: "auto",
            minHeight: "50vh",
          }}
        >
          {/* Modal Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box
              sx={{
                display: "inline-block",
                p: "11px 12px 5px 12px",
                cursor: "pointer",
                backgroundColor: "background.level1",
                borderRadius: "50%",
                ":hover": {
                  backgroundColor: "background.level2",
                },
              }}
              onClick={onClose}
            >
              <FaArrowLeft size={20} />
            </Box>
            <Typography level="title-lg">View / Edit / Delete</Typography>
          </Stack>

          {/* Modal Body */}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <Spinner size="md" />
            </Box>
          ) : (
            <>
              {allowedFields.map((key) => (
                <Box key={key} mb={2}>
                  <Typography level="body1" sx={{ mb: 1 }}>
                    {key}
                  </Typography>
                  {key === "employee" || key === "customer" ? (
                    <Select
                      name={key}
                      value={get(editedData, `${key}._id`) || ""} // Use an empty string if cleared
                      onClick={selectChangeHandler}
                      disabled={disabled}
                      placeholder={
                        get(originalData, `${key}.name`) || "Select..."
                      }
                      onChange={(e, value) =>
                        handleChange({
                          target: { name: key, value: { _id: value } }, // Store _id in editedData
                        })
                      }
                      indicator={loading ? <Spinner size="sm" /> : null}
                    >
                      {getOptions(key, employees, customers, originalData).map(
                        (item) => (
                          <Option
                            key={item._id}
                            value={item._id}
                            label={item.name} // Ensure only the name is displayed when selected
                            sx={{ padding: "6px 12px" }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Box>
                                <Typography
                                  level="body1"
                                  sx={{
                                    fontWeight: "600",
                                    color: "text.primary", // Emphasize primary text color
                                    marginBottom: "2px", // Add spacing between name and date
                                  }}
                                >
                                  {item.name}
                                </Typography>

                                <Typography
                                  level="body-xs"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "text.secondary", // Subtle color for secondary information
                                    gap: "4px", // Add spacing between icon and text
                                  }}
                                >
                                  <MdHistory size={16} />
                                  {formatTimeAgo(item.latestService)}
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  backgroundColor: "background.level2", // Subtle badge-like background
                                  padding: "4px 8px", // Compact padding for a cleaner badge look
                                  borderRadius: "12px", // Rounded for badge-style design
                                }}
                              >
                                <MdAssignmentTurnedIn
                                  size={18}
                                  style={{
                                    marginRight: "6px",
                                    color: "success.main", // Use a color that indicates success
                                  }}
                                />
                                <Typography
                                  level="body2"
                                  sx={{
                                    fontWeight: "600",
                                    color: "text.primary", // Keep text clear and bold
                                  }}
                                >
                                  {item.servicesQuantity}
                                </Typography>
                              </Box>
                            </Box>
                          </Option>
                        )
                      )}
                    </Select>
                  ) : (
                    <Input
                      name={key}
                      value={get(editedData, key) || ""}
                      onChange={handleChange}
                      fullWidth
                      disabled={disabled}
                    />
                  )}
                </Box>
              ))}

              {/* Footer Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Button
                  size="sm"
                  variant="outlined"
                  color="danger"
                  onClick={handleDelete}
                  endDecorator={<MdDelete size={16} />}
                  disabled={deleting}
                >
                  {deleting ? <Spinner size="sm" /> : "Delete"}
                </Button>
                <Stack direction="row" spacing={1}>
                  {disabled ? (
                    <Button
                      size="sm"
                      variant="soft"
                      color="primary"
                      endDecorator={<MdEdit size={16} />}
                      onClick={() => setDisabled(false)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="soft"
                        onClick={handleUndo}
                        sx={{ mr: 1 }}
                      >
                        Undo
                      </Button>
                      <Button
                        size="sm"
                        variant="soft"
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {saving ? <Spinner size="sm" /> : "Save"}
                      </Button>
                    </>
                  )}
                </Stack>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default EditModal;
