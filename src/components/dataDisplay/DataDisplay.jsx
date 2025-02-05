import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Stack, Button, ButtonGroup } from "@mui/joy";
import Spinner from "../ui/Spinner";
import CustomersTable from "./customers/CustomersTable";
import CustomersCard from "./customers/CustomersCard";
import EmployeesTable from "./employees/EmployeesTable";
import EmployeesCard from "./employees/EmployeesCard";
import ServiceTable from "./doneServices/ServiceTable";
import AlertMessage from "../AlertMessage";
import Fuse from "fuse.js";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../Pagination";
import { fetchRequest } from "../../utils/fetchRequest";
import SearchBar from "../SearchBar";
import { LuIdCard, LuRows3 } from "react-icons/lu";
import ServiceCard from "./doneServices/ServiceCard";
import debounce from "lodash/debounce";
import EditModal from "../../components/EditModal";
// style
import "./style.css";

// ! Separate controls staff like search and buttons

// Memoize the card and table components
const MemoizedCustomersCard = React.memo(CustomersCard);
const MemoizedEmployeesCard = React.memo(EmployeesCard);
const MemoizedServiceCard = React.memo(ServiceCard);
const MemoizedCustomersTable = React.memo(CustomersTable);
const MemoizedEmployeesTable = React.memo(EmployeesTable);
const MemoizedServiceTable = React.memo(ServiceTable);

const DataDisplay = () => {
  const [initialData, setInitialData] = useState([]);
  // console.log(initialData);
  // Search
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fuse, setFuse] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // data view format table / card
  const [isCardView, setIsCardView] = useState(false);

  // Initial displayed data name / type
  const [viewType, setViewType] = useState("employees");

  // Edit modal (modal responsible for document view / edit / delete)
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDocId, setEditDocId] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  // Pagination
  const {
    currentPage,
    itemsPerPage,
    calculateTotalPages,
    goToNextPage,
    goToPreviousPage,
    changeItemsPerPage,
    currPageReset,
  } = usePagination();
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = useMemo(
    () => calculateTotalPages(totalItems),
    [calculateTotalPages, totalItems]
  );
  const itemsPerPageOptions = [2, 10, 50, 100, -1];

  // Change ViewType to change displayed data
  const handleViewChange = useCallback(
    (category) => {
      setViewType(category);

      currPageReset(); // (pagination) change current page to 1
    },
    [currPageReset]
  );

  const handleFakeRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadPaginatedData = async () => {
      setLoading(true);
      setError(null);

      try {
        const from = viewType.toLowerCase().trim();
        const url = `${from}?sort=-date&page=${currentPage}&limit=${itemsPerPage}`;
        // const url = `employees?sort=-date&page=${currentPage}&limit=${itemsPerPage}`;
        const { data, total } = await fetchRequest(
          url,
          "GET",
          null,
          true,
          signal
        );
        setFilteredData(data.doc);
        setTotalItems(total);
        setInitialData(data.doc);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(`Error loading data: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPaginatedData();

    return () => controller.abort();
  }, [currentPage, itemsPerPage, viewType, refreshKey]);

  useEffect(() => {
    if (initialData.length) {
      setFuse(
        new Fuse(initialData, {
          keys: [
            "name",
            "phone",
            "email",
            "notes",
            "latestService",
            "customer.name",
            "employee.name",
            "rating",
            "ratingsAverage",
            "feedback",
            "date",
          ],
          threshold: 0.3,
        })
      );
    }
  }, [initialData]);

  const handleSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
      if (fuse && term) {
        const results = fuse.search(term).map(({ item }) => item);
        setFilteredData(results);
      } else {
        setFilteredData(initialData);
      }
    }, 40),
    [fuse, initialData]
  );

  const handleViewToggle = useCallback(() => {
    setIsCardView((prev) => !prev);
  }, []);

  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={2}
        mb={2}
      >
        {/* Search & view format switching buttons */}
        <Stack
          direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
          spacing={1}
          justifyContent={{ xs: "center" }}
        >
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <ButtonGroup
            onClick={handleViewToggle}
            aria-label="outlined primary button group"
          >
            <Button disabled={!isCardView}>
              <LuRows3 size={22} />
            </Button>
            <Button disabled={isCardView}>
              <LuIdCard size={22} />
            </Button>
          </ButtonGroup>
        </Stack>

        {/* View type switcher buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center" }}
          spacing={1}
        >
          <Button
            variant="soft"
            disabled={viewType === "customers"}
            onClick={() => handleViewChange("customers")}
          >
            Customers
          </Button>
          <Button
            variant="soft"
            disabled={viewType === "employees"}
            onClick={() => handleViewChange("employees")}
          >
            Employees
          </Button>
          <Button
            variant="soft"
            disabled={viewType === "services"}
            onClick={() => handleViewChange("services")}
          >
            Services
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ p: { xs: 0, sm: 1, md: 2 } }}>
        <Box
          sx={{
            overflowY: "scroll",
            height: "50vh",
            borderRadius: 2,
          }}
        >
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Spinner size="md" />
            </Box>
          )}
          {error && (
            <AlertMessage type="error" message={error} actionText="Retry" />
          )}
          {filteredData === undefined && !loading && <p>No data found...</p>}
          {filteredData !== undefined && !loading && !error && (
            // Modal for view / edit / delete
            <EditModal
              isOpen={showEditModal}
              setIsOpen={setShowEditModal}
              dataId={editDocId}
              viewType={viewType}
              onFakeRefresh={handleFakeRefresh}
            />
          )}
          {(filteredData !== undefined || filteredData.length > 0) &&
            !loading &&
            !error &&
            (isCardView ? (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 2,
                  p: { xs: 0, sm: 4, md: 6 },
                }}
              >
                {viewType === "employees" && (
                  <MemoizedEmployeesCard data={filteredData} />
                )}
                {viewType === "customers" && (
                  <MemoizedCustomersCard data={filteredData} />
                )}
                {viewType === "services" && (
                  <MemoizedServiceCard data={filteredData} />
                )}
              </Box>
            ) : (
              <Box className="responsive-table">
                {viewType === "employees" && (
                  <MemoizedEmployeesTable
                    data={filteredData}
                    setShowEditModal={setShowEditModal}
                    setEditDocId={setEditDocId}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                  />
                )}
                {viewType === "customers" && (
                  <MemoizedCustomersTable
                    data={filteredData}
                    setShowEditModal={setShowEditModal}
                    setEditDocId={setEditDocId}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                  />
                )}
                {viewType === "services" && (
                  <MemoizedServiceTable
                    data={filteredData}
                    setShowEditModal={setShowEditModal}
                    setEditDocId={setEditDocId}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                  />
                )}
              </Box>
            ))}
        </Box>
      </Box>
      <Box sx={{ marginY: "10px" }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={goToPreviousPage}
          onNextPage={() => goToNextPage(totalPages)}
          onItemsPerPageChange={(newItemsPerPage) =>
            changeItemsPerPage(newItemsPerPage, totalItems)
          }
          itemsPerPageOptions={itemsPerPageOptions}
          itemsPerPage={itemsPerPage}
        />
      </Box>
    </>
  );
};

export default React.memo(DataDisplay);
