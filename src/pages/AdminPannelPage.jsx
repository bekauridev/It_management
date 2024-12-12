import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  ButtonGroup,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  ListItemDecorator,
} from "@mui/joy";
import Fuse from "fuse.js";
import { fetchRequest } from "../utils/fetchRequest";
import SearchBar from "../components/SearchBar";
import OrgForm from "../components/OrgForm";
import DataDisplay from "../components/DataDisplay";
import CardIcon from "../components/ui/icons/CardIcon";
import AlertMessage from "../components/AlertMessage";

import ServiceForm from "../components/ServiceForm";
import { LuRows3 } from "react-icons/lu";
import { FaAddressBook, FaHistory } from "react-icons/fa";
import { MdDataSaverOff, MdHomeRepairService } from "react-icons/md";
import HistoryData from "../components/HistoryData";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import useAuthContext from "../hooks/useAuthContext";
import { replace, useNavigate } from "react-router-dom";

function AdminPannelPage() {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const [orgData, setOrgData] = useState([]);
  // Search
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fuse, setFuse] = useState(null);

  // Pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const [totalItems, setTotalItems] = useState(0);
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

  // Data display mode (table/card)
  const [isCardView, setIsCardView] = useState(false);

  // Filter buttons customers and employees
  const [isCustomerBtnDisabled, setIsCustomerBtnDisabled] = useState(false);
  const [isEmployeeBtnDisabled, setIsEmployeeBtnDisabled] = useState(true);

  useEffect(() => {
    if (user?.role !== "admin") return navigate("/home", replace);
  }, [user, navigate]);

  useEffect(() => {
    const loadPaginatedData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `employees?page=${currentPage}&limit=${itemsPerPage}`;
        const { data, total } = await fetchRequest(url, "GET");
        setFilteredData(data.doc);
        setTotalItems(total); // Update total for pagination
        setOrgData(data.doc);

        setFuse(
          new Fuse(data.doc, {
            keys: ["name", "phone", "email", "notes", "latestService"],
            threshold: 0.3, // fuzzy matching tolerance
          })
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPaginatedData();
  }, [currentPage, itemsPerPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const results = fuse.search(term).map(({ item }) => item);
      setFilteredData(results);
    } else {
      setFilteredData(orgData);
    }
  };

  const handleFilter = async (category) => {
    setError(null);
    setLoading(true);
    try {
      const url = category.toLowerCase();
      if (url === "customers") {
        setIsCustomerBtnDisabled(true);
        setIsEmployeeBtnDisabled(false);
      }
      if (url === "employees") {
        setIsEmployeeBtnDisabled(true);
        setIsCustomerBtnDisabled(false);
      }

      const response = await fetchRequest(url, "GET");
      const { data } = response;
      setFilteredData(data.doc);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewToggle = () => {
    setIsCardView((prev) => !prev);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        justifyContent: { xs: "center", md: "space-between" },
        p: { xs: 1, md: 2 },
        minHeight: "100vh",
        bgcolor: "background.body",
        marginTop: { xs: "56px", md: "64px" },
      }}
    >
      {/* Sidebar */}
      <Tabs
        sx={{
          width: "100%",
          pt: "10px",
          // Styles for the tab indicator
          "--Tab-indicatorSize": {
            xs: "20px",
            sm: "25px",
            md: "31px",
          },
          "--Tab-indicatorThickness": "2px",
          "--Tab-indicatorRadius": "10px",
          // Adjust spacing between tabs for different screen sizes
          "--Tabs-spacing": {
            xs: "10px",
            sm: "15px",
            md: "20px",
          },
        }}
      >
        <TabList>
          <Tab>
            <ListItemDecorator>
              <FaAddressBook size={16} />
            </ListItemDecorator>
            Form
          </Tab>
          <Tab>
            <ListItemDecorator>
              <MdDataSaverOff />
            </ListItemDecorator>
            Data
          </Tab>
          <Tab>
            <ListItemDecorator>
              <MdHomeRepairService size={18} />
            </ListItemDecorator>
            Service
          </Tab>
          <Tab>
            <FaHistory style={{ marginTop: "2px" }} />
          </Tab>
        </TabList>

        {/*  Form */}
        <TabPanel value={0}>
          <Box
            sx={{
              maxWidth: "400px",
              margin: "0 auto",
              p: { xs: 1, md: 2 },
              borderRadius: 2,
              boxShadow: "md",
              bgcolor: "background.surface",
            }}
          >
            <Stack spacing={2}>
              <OrgForm />
            </Stack>
          </Box>
        </TabPanel>

        {/* Main Content */}
        <TabPanel value={1}>
          <Box
            sx={{
              flexGrow: 1,
              p: { xs: 1, md: 2 },
              borderRadius: 2,
              boxShadow: "md",
              // height: "50vh",
            }}
          >
            {/* Controls */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              spacing={2}
              mb={2}
            >
              {/*Search Bar and View Toggle Buttons */}
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
                    <CardIcon />
                  </Button>
                </ButtonGroup>
              </Stack>

              {/* Filter Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={{ xs: "center" }}
                spacing={1}
              >
                <Button
                  disabled={isCustomerBtnDisabled}
                  onClick={() => handleFilter("Customers")}
                >
                  Customers
                </Button>
                <Button
                  disabled={isEmployeeBtnDisabled}
                  onClick={() => handleFilter("Employees")}
                >
                  Employees
                </Button>
              </Stack>
            </Stack>

            {/* Data Display */}
            {error && <AlertMessage color="danger" message={error} />}
            {filteredData.length === 0 && (
              <Typography>No results found</Typography>
            )}
            {filteredData.length !== 0 && (
              <DataDisplay
                data={filteredData}
                onhandleViewToggle={handleViewToggle}
                isCardView={isCardView}
                loading={loading}
              />
            )}

            {/* Pagination */}
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
        </TabPanel>

        {/* Create  Service */}
        <TabPanel value={2}>
          <Box
            sx={{
              maxWidth: "400px",
              margin: "0 auto",
              p: { xs: 1, md: 2 },
              borderRadius: 2,
              boxShadow: "md",
              bgcolor: "background.surface",
            }}
          >
            <ServiceForm />
          </Box>
        </TabPanel>

        {/* Services History */}
        <TabPanel value={3}>
          <HistoryData />
        </TabPanel>
      </Tabs>
    </Stack>
  );
}

export default AdminPannelPage;
