import formatDate from "../../../utils/formatDate";
import GenericCard from "../../shared/CustomCard";

function EmployeesCard({ data }) {
  if (!data || data.length === 0) return <p>No employees found...</p>;
  console.log(data);
  return (
    <>
      {data.map((employee) => (
        <GenericCard
          key={employee.id || employee._id}
          title={employee.name}
          fields={[
            { label: "Phone", value: employee.phone },
            { label: "Email", value: employee.email },
            {
              label: "Ratings",
              value:
                employee.ratingsAverage > 0 && employee.ratingsQuantity > 0
                  ? `${employee.ratingsAverage}⭐ (${employee.ratingsQuantity})`
                  : "N/A",
            },
            {
              label: "Last Service",
              value: employee.latestService
                ? formatDate(employee.latestService, "en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "N/A",
            },
            { label: "Note", value: employee.notes },
          ]}
          // onClick={() => onCardClick(org)} // Example click handler
        />
      ))}
    </>
  );
}

export default EmployeesCard;
