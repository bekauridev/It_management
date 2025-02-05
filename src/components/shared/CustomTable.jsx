import { Sheet, Table } from "@mui/joy";
import React from "react";
const CustomTable = ({
  headers,
  data,

  renderRow,
  tableStyles,
  bodyStyles,
}) => {
  if (!headers || headers.length === 0) return null;
  if (!data || data.length === 0) return <p>No customers found... </p>;

  return (
    <Table
      sx={{
        width: "100%",
        fontSize: "1rem",
        minWidth: "600px",

        // # - header
        "& tr > *:first-of-type": {
          position: "sticky",
          left: 0,
          width: "42px",
          bgcolor: "background.level1",
          textAlign: "center",
        },
        "& th": {
          bgcolor: "background.level1",
        },
        "& tr:hover": {
          bgcolor: "background.level1",
        },

        ...tableStyles, // Allow customization of table styles
      }}
    >
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody style={{ ...bodyStyles }}>
        {data.map((row, index) => renderRow(row, index))}
      </tbody>
    </Table>
  );
};

export default CustomTable;
