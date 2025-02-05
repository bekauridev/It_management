import React from "react";
import { Button, Typography, Stack } from "@mui/joy";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onItemsPerPageChange,
  itemsPerPageOptions,
  itemsPerPage,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Button
        disabled={currentPage === 1}
        size="sm"
        variant="soft"
        onClick={onPreviousPage}
      >
        <FaArrowLeft />
      </Button>
      <Typography mx={2}>
        {currentPage} / {totalPages}
      </Typography>
      <Button
        disabled={currentPage === totalPages || totalPages === 0}
        size="sm"
        variant="soft"
        onClick={onNextPage}
      >
        <FaArrowRight />
      </Button>
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(parseInt(e.target.value, 10))}
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          padding: "5px",
          borderRadius: "4px",
          backgroundColor: "#374151",
          color: "#fff",
          marginLeft: "10px",
        }}
      >
        {itemsPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option === -1 ? "All" : option}
          </option>
        ))}
      </select>
    </Stack>
  );
};

export default Pagination;
