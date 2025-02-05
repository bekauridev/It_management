import { useState } from "react";
import CustomTable from "../../shared/CustomTable";

const EmployeesTable = ({
  data,
  setShowEditModal,
  setEditDocId,
  currentPage,
  itemsPerPage,
}) => {
  const headers = ["#", "Name", "Phone", "email"];

  const handleClick = (e) => {
    const id = e.currentTarget.dataset.id;
    setShowEditModal(true);
    setEditDocId(id);
  };
  if (!data || data.length === 0) return <p>No customers found...</p>;

  const renderRow = (row, index) => (
    <tr
      key={row.id || row._id}
      data-id={row.id || row._id}
      onClick={handleClick}
    >
      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
      <td>{row.name}</td>
      <td>{row.phone}</td>
      <td>{row.email}</td>
    </tr>
  );

  return <CustomTable headers={headers} data={data} renderRow={renderRow} />;
};

export default EmployeesTable;
