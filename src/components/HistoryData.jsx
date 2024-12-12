import { useEffect, useState } from "react";
import { Box, Stack, Table, Typography } from "@mui/joy";
import { fetchRequest } from "../utils/fetchRequest"; // Adjust the import path as needed
import AlertMessage from "./AlertMessage";
import Spinner from "./ui/Spinner";
import Fuse from "fuse.js";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination"; // Import the reusable Pagination component
import { usePagination } from "../hooks/usePagination";
import "../styles/mediaquery.css"; // Make sure this file contains responsive styles for the table

function HistoryData() {
  const [servicesData, setServicesData] = useState([]);
  // Search
  const [filteredData, setFilteredData] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination
  const {
    currentPage,
    itemsPerPage,
    calculateTotalPages,
    goToNextPage,
    goToPreviousPage,
    changeItemsPerPage,
  } = usePagination();
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = calculateTotalPages(totalItems);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const { data, total } = await fetchRequest(
          `services?sort=-date&page=${currentPage}&limit=${itemsPerPage}`,
          "GET"
        );
        setServicesData(data.doc);
        setFilteredData(data.doc);
        setTotalItems(total); // Set total items for pagination
        setFuse(
          new Fuse(data.doc, {
            keys: [
              "employee.name",
              "customer.name",
              "serviceDetails",
              "date",
              "rating",
              "feedback",
            ],
            threshold: 0.3, // fuzzy matching tolerance
          })
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [currentPage, itemsPerPage]); // Refetch data when currentPage or itemsPerPage changes

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const results = fuse.search(term).map(({ item }) => item);
      setFilteredData(results);
    } else {
      setFilteredData(servicesData);
    }
  };

  return (
    <>
      {error && <AlertMessage message={error} color="danger" />}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Spinner size={"md"} />
        </Box>
      )}
      {!error && !loading && (
        <Box
          sx={{
            padding: { lg: 3, xs: 2 },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ marginBottom: 2 }}
          >
            <Typography level="h2" sx={{ marginBottom: { xs: 2, sm: 0 } }}>
              Service History
            </Typography>
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          </Stack>
          <Box
            sx={{
              height: "50vh",
              overflowX: "auto", // Enable horizontal scrolling for small screens
            }}
          >
            <Table
              sx={{
                width: "100%",
                fontSize: "1rem",
                minWidth: "600px", // Prevent table from shrinking too small
                "@media (max-width: 600px)": {
                  fontSize: "0.875rem", // Adjust font size for smaller screens
                },
              }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee</th>
                  <th>Customer</th>
                  <th>Service Details</th>
                  <th>Date</th>
                  <th>Rating</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((service, index) => (
                  <tr key={service._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{service.employee.name}</td>
                    <td>{service.customer.name}</td>
                    <td>{service.serviceDetails}</td>
                    <td>{new Date(service.date).toLocaleDateString()}</td>
                    <td>{service.rating}</td>
                    <td>{service.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
          {/* Pagination Component */}
          <Box sx={{ marginTop: 2 }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={goToPreviousPage}
              onNextPage={() => goToNextPage(totalPages)}
              onItemsPerPageChange={(newItemsPerPage) =>
                changeItemsPerPage(newItemsPerPage, totalItems)
              }
              itemsPerPageOptions={[2, 10, 50, 100, -1]}
              itemsPerPage={itemsPerPage}
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default HistoryData;
