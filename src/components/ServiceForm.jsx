import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Option,
  Textarea,
  Typography,
} from "@mui/joy";
import { fetchRequest } from "../utils/fetchRequest";
import { IoIosArrowDown } from "react-icons/io";
import AlertMessage from "./AlertMessage";
import Spinner from "./ui/Spinner";

const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    employee: "",
    customer: "",
    serviceDetails: "",
    date: "",
    rating: 0,
    feedback: "",
  });

  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const selectChangeHandler = async (e) => {
    const { name } = e.target;
    try {
      setLoading(true);
      setError("");
      const url = name === "employee" ? "employees" : "customers";
      const data = await fetchRequest(url, "GET");

      if (data && url === "employees") setEmployees(data.data.doc);
      if (data && url === "customers") setCustomers(data.data.doc);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetchRequest("services", "POST", formData);
      console.log(res);
      // Reset the form
      setFormData({
        employee: "",
        customer: "",
        serviceDetails: "",
        date: "",
        rating: 0,
        feedback: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Employee Selector */}
      <Box mb={2}>
        <Typography level="body1" sx={{ mb: 1 }}>
          Select Employee
        </Typography>
        <Select
          indicator={loading ? <Spinner size="sm" /> : <IoIosArrowDown />}
          name="employee"
          value={formData.employee}
          onClick={selectChangeHandler}
          onChange={(e, value) =>
            handleChange({ target: { name: "employee", value } })
          }
          placeholder="Select Employee"
        >
          {employees.length > 0 &&
            employees.map((emp) => (
              <Option key={emp._id} value={emp._id}>
                {emp.name} {emp.servicesQuantity}
              </Option>
            ))}
        </Select>
      </Box>

      {/* Customer Selector */}
      <Box mb={2}>
        <Typography level="body1" sx={{ mb: 1 }}>
          Select Customer
        </Typography>
        <Select
          name="customer"
          value={formData.customer}
          indicator={loading ? <Spinner size="sm" /> : <IoIosArrowDown />}
          onClick={selectChangeHandler}
          onChange={(e, value) =>
            handleChange({ target: { name: "customer", value } })
          }
          placeholder="Select Customer"
        >
          {customers.length > 0 &&
            customers.map((cust) => (
              <Option key={cust._id} value={cust._id}>
                {cust.name}
              </Option>
            ))}
        </Select>
      </Box>

      {/* Service Details */}
      <Box mb={2}>
        <Typography level="body1" sx={{ mb: 1 }}>
          Service Details
        </Typography>
        <Textarea
          name="serviceDetails"
          placeholder="Enter service details"
          value={formData.serviceDetails}
          onChange={handleChange}
          minRows={3}
        />
      </Box>

      {/* Date */}
      <Box mb={2}>
        <Typography level="body1" sx={{ mb: 1 }}>
          Date
        </Typography>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </Box>

      {/* Rating */}
      <Box mb={2}>
        <Typography level="body1" sx={{ mb: 1 }}>
          Rating (1-5)
        </Typography>
        <Input
          type="number"
          name="rating"
          placeholder="Enter rating (1-5)"
          value={formData.rating}
          onChange={handleChange}
          slotProps={{
            input: {
              min: 1,
              max: 5,
              step: 1,
            },
          }}
        />
      </Box>

      {/* Feedback */}
      <Box mb={2}>
        <Typography level="body1" sx={{ mb: 1 }}>
          Feedback
        </Typography>
        <Textarea
          name="feedback"
          placeholder="Enter feedback"
          value={formData.feedback}
          onChange={handleChange}
          minRows={3}
        />
      </Box>

      <Button type="submit" loading={loading} disabled={loading}>
        Submit
      </Button>

      {error && <AlertMessage message={error} />}
    </form>
  );
};

export default AddServiceForm;
