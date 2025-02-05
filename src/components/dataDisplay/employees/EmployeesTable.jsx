import CustomTable from "../../shared/CustomTable";
import formatDate from "../../../utils/formatDate";
import EditModal from "../../EditModal";

const EmployeesTable = ({
  data,
  setShowEditModal,
  setEditDocId,
  currentPage,
  itemsPerPage,
}) => {
  const headers = ["#", "Name", "Phone", "Services", "Rating", "Last Service"];

  if (!data || data.length === 0) return <p>No employees found...</p>;
  //

  const handleClick = (e) => {
    const id = e.currentTarget.dataset.id;
    setShowEditModal(true);
    setEditDocId(id);
  };

  const renderRow = (row, index) => (
    <tr
      key={row.id || row._id}
      data-id={row.id || row._id}
      onClick={handleClick}
    >
      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>

      <td>{row.name}</td>
      <td>{row.phone}</td>
      <td>{row.servicesQuantity}</td>
      <td>
        {`${row.ratingsQuantity} / ${
          row.ratingsAverage ? row.ratingsAverage : "N/A"
        }`}
        ⭐
      </td>
      <td>
        {row.latestService
          ? formatDate(row.latestService, "ka-ge", {
              month: "short",
              year: "numeric",
            })
          : "N/A"}
      </td>
    </tr>
  );

  return <CustomTable headers={headers} data={data} renderRow={renderRow} />;
};

export default EmployeesTable;
