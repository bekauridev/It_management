import GenericCard from "../../shared/CustomCard";

function ServiceCard({ data }) {
  if (!data || data.length === 0) return <p>No services found...</p>;
  console.log(`service card`, data);
  return (
    <>
      {data.map((service) => (
        <GenericCard
          key={service.id || service._id}
          title={service.serviceDetails || "N/A"}
          fields={[
            { label: "Employee", value: service.employee?.name || "N/A" },
            { label: "Customer", value: service.customer?.name || "N/A" },

            { label: "Date", value: service.date || "N/A" },
            { label: "Rating", value: service.rating || "N/A" },
            { label: "Feedback", value: service.feedback || "N/A" },
          ]}
          // onClick={() => onCardClick(org)} // Example click handler
        />
      ))}
    </>
  );
}

export default ServiceCard;
