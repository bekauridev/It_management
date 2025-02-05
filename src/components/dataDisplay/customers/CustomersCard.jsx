import GenericCard from "../../shared/CustomCard";

function CustomersCard({ data }) {
  if (!data || data.length === 0) return <p>No customers found...</p>;

  return (
    <>
      {data.map((customer) => (
        <GenericCard
          key={customer.id || customer._id}
          title={customer.name}
          fields={[
            { label: "Phone", value: customer.phone },
            { label: "Email", value: customer.email },
            { label: "Note", value: customer.notes },
          ]}
          // onClick={() => onCardClick(org)} // Example click handler
        />
      ))}
    </>
  );
}

export default CustomersCard;
