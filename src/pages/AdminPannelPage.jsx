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
import OrgForm from "../components/OrgForm";
import DataDisplay from "../components/dataDisplay/DataDisplay";

import ServiceForm from "../components/ServiceForm";

import {
  MdAssignmentAdd,
  MdDataSaverOff,
  MdHomeRepairService,
  MdOutlineGroupAdd,
} from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";
function AdminPannelPage() {
  // TO DO : Implement role based routing

  // useEffect(() => {
  //   if (user?.role !== "admin") return navigate("/home", replace);
  // }, [user, navigate]);

  // TO DO : Implement API Fetch using react query
  // Pagination

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
              <MdOutlineGroupAdd size={20} />
            </ListItemDecorator>
            Form
          </Tab>
          <Tab>
            <ListItemDecorator>
              {/* <MdHomeRepairService size={18} /> */}
              <MdAssignmentAdd size={18} />
            </ListItemDecorator>
            Service
          </Tab>
          <Tab>
            <ListItemDecorator>
              <MdDataSaverOff />
            </ListItemDecorator>
            Data
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

        {/* Create  Service */}
        <TabPanel value={1}>
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

        {/* Main Content */}
        <TabPanel value={2}>
          <Box
            sx={{
              flexGrow: 1,
              p: { xs: 1, md: 2 },
              borderRadius: 2,
              boxShadow: "md",
              // height: "50vh",
            }}
          >
            {/* Data Display */}
            <DataDisplay />
          </Box>
        </TabPanel>
      </Tabs>
    </Stack>
  );
}

export default AdminPannelPage;
