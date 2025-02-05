// export default ServiceTable;
import { useState } from "react";
import CustomTable from "../../shared/CustomTable";
import {
  Box,
  Button,
  Sheet,
  Stack,
  Tab,
  Table,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";

import { MdDelete, MdEdit } from "react-icons/md";
import "../style.css";
const ServiceTable = ({
  data,
  setShowEditModal,
  setEditDocId,
  currentPage,
  itemsPerPage,
}) => {
  // Track open state for each row by ID
  const [openRows, setOpenRows] = useState({});

  const handleClick = (e) => {
    const id = e.currentTarget.dataset.id;
    setShowEditModal(true);
    setEditDocId(id);
  };
  const headers = ["#", "Employee", "Customer", "Date", "Rating"];

  if (!data || data.length === 0) return <p>No services found...</p>;
  const renderRow = (row, index) => {
    return (
      <tr
        key={row.id || row._id}
        data-id={row.id || row._id}
        onClick={handleClick}
      >
        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{row.employee?.name || "N/A"}</td>
        <td>{row.customer?.name || "N/A"}</td>
        <td>{new Date(row.date).toLocaleDateString() || "N/A"}</td>
        <td>{`${row.rating || "N/A"}⭐`}</td>
      </tr>
    );
  };

  return (
    <CustomTable
      className={"responsive-table"}
      headers={headers}
      data={data}
      renderRow={renderRow}
    />
  );
};

export default ServiceTable;
