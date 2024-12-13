import { Box, Typography, Card, Table } from "@mui/joy";
import formatDate from "../utils/formatDate";
import Spinner from "./ui/Spinner";

import "../styles/mediaquery.css";

const DataDisplay = ({ data, loading, isCardView }) => {
  return (
    <Box sx={{ p: { xs: 0, sm: 1, md: 2 } }}>
      {/* Data Container */}
      <Box
        sx={{
          overflowY: "scroll",
          height: "50vh",
          borderRadius: 2,
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Spinner size="md" />
          </Box>
        ) : isCardView ? (
          // === Card View
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              p: { xs: 0, sm: 4, md: 6 },
            }}
          >
            {data.map((org) => (
              <Card
                key={org.id}
                sx={{
                  maxWidth: 400,
                  width: "100%",
                  boxShadow: "lg",
                  borderRadius: 16,
                  p: { xs: 2, lg: 3 },
                  backgroundColor: "background.level1",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  transition: "transform 0.2s, box-shadow 0.2s", // Adds hover effects
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "xl",
                  },
                }}
              >
                {/* Card Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography level="h5" fontWeight="bold">
                    {org.name}
                  </Typography>
                  <Typography level="body3" color="text.secondary">
                    {org.category}
                  </Typography>
                </Box>

                {/* Card Body */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    pt: 1.5,
                    cursor: "pointer",
                  }}
                >
                  {/* Phone */}
                  <Typography level="body2" color="text.secondary">
                    Phone: {org.phone}
                  </Typography>
                  {/* Email */}
                  {org.email && (
                    <Typography level="body2" color="text.secondary">
                      Email: {org.email}
                    </Typography>
                  )}

                  {/*Rating Quantity and Rating */}
                  {org.ratingsAverage > 0 && org.ratingsQuantity > 0 && (
                    <Typography level="body2" color="text.secondary">
                      Ratings: {org.ratingsAverage}⭐ ( {org.ratingsQuantity} )
                    </Typography>
                  )}

                  {/* Last Service */}
                  {org.latestService && (
                    <Typography level="body2" color="text.secondary">
                      Last Service:&nbsp;
                      {formatDate(org.latestService, "en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>
                  )}

                  {/* Notes */}
                  <Typography level="body2" color="text.secondary">
                    Note: {org.notes}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        ) : (
          // Table View
          // responsive styles in styles/mediaquery.css
          <Box className="responsive-table">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Quantity</th>
                  <th>Rating</th>
                  <th>Last Service</th>
                </tr>
              </thead>
              <tbody
                style={{
                  cursor: "pointer",
                }}
              >
                {data.map((org) => (
                  <tr key={org.id}>
                    <td>{org.name}</td>
                    <td>{org.phone}</td>
                    <td>{org.ratingsQuantity}</td>
                    <td>{org.ratingsAverage ? org.ratingsAverage : "N/A"}⭐</td>
                    <td>
                      {formatDate(org.latestService, "ka-ge", {
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DataDisplay;

// import { Box, Typography, Card, Table, IconButton, Button } from "@mui/joy";

// import { MdDelete, MdEdit } from "react-icons/md";
// import formatDate from "../utils/formatDate";
// import Spinner from "./ui/Spinner";

// import "../styles/mediaquery.css";
// import { fetchRequest } from "../utils/fetchRequest";
// import { useState } from "react";
// import EditModal from "./EditModal";

// const DataDisplay = ({ data, loading, isCardView, isEmployeeBtnDisabled }) => {
//   const [error, setError] = useState(null);
//   const [changeLoading, setChangeLoading] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [currentData, setCurrentData] = useState(null);
//   const handleEdit = async (id, updatedData) => {
//     try {
//       setChangeLoading(true);
//       const url = isEmployeeBtnDisabled === true ? "employees" : "customers";
//       await fetchRequest(`${url}/${id}`, "PATCH", updatedData);
//       console.log("Data updated successfully.");
//     } catch (err) {
//       setError(err.message || "Failed to update data.");
//     } finally {
//       setChangeLoading(false);
//     }
//   };

//   const handleDelete = async (url, id) => {
//     try {
//       setChangeLoading(true);
//       await fetchRequest(`${url}/${id}`, "DELETE");
//     } catch (err) {
//       setError(err.message || "Failed to delete the item.");
//     } finally {
//       setChangeLoading(false);
//       console.log("Item deleted successfully.");
//     }
//   };

//   const handleAction = async (id, action) => {
//     const url = isEmployeeBtnDisabled === true ? "employees" : "customers";
//     try {
//       const { data } = await fetchRequest(`${url}/${id}`, "GET");
//       if (action === "edit") {
//         setCurrentData(data);
//         setEditModalOpen(true);
//       }
//       if (action === "delete") {
//         handleDelete(url, id);
//       }
//     } catch (err) {
//       setError(err.message || "Failed to perform action.");
//     }
//   };
//   return (
//     <Box sx={{ p: { xs: 0, sm: 1, md: 2 } }}>
//       {/* Data Container */}
//       <Box
//         sx={{
//           overflowY: "scroll",
//           height: "50vh",
//           borderRadius: 2,
//         }}
//       >
//         {loading ? (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//             }}
//           >
//             <Spinner size="md" />
//           </Box>
//         ) : isCardView ? (
//           // === Card View
//           <Box
//             sx={{
//               display: "flex",
//               flexWrap: "wrap",
//               justifyContent: "center",
//               gap: 2,
//               p: { xs: 0, sm: 4, md: 6 },
//             }}
//           >
//             {data.map((org) => (
//               <Card
//                 key={org.id}
//                 sx={{
//                   maxWidth: 400,
//                   width: "100%",
//                   boxShadow: "lg",
//                   borderRadius: 16,
//                   p: { xs: 2, lg: 3 },
//                   backgroundColor: "background.level1",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 1.5,
//                   transition: "transform 0.2s, box-shadow 0.2s", // Adds hover effects
//                   "&:hover": {
//                     transform: "translateY(-2px)",
//                     boxShadow: "xl",
//                   },
//                 }}
//               >
//                 {/* Card Header */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 1,
//                   }}
//                 >
//                   <Typography level="h5" fontWeight="bold">
//                     {org.name}
//                   </Typography>
//                   <Typography level="body3" color="text.secondary">
//                     {org.category}
//                   </Typography>
//                 </Box>

//                 {/* Card Body */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 0.5,
//                     borderTop: "1px solid",
//                     borderColor: "divider",
//                     pt: 1.5,
//                     cursor: "pointer",
//                   }}
//                 >
//                   {/* Phone */}
//                   <Typography level="body2" color="text.secondary">
//                     Phone: {org.phone}
//                   </Typography>
//                   {/* Email */}
//                   {org.email && (
//                     <Typography level="body2" color="text.secondary">
//                       Email: {org.email}
//                     </Typography>
//                   )}

//                   {/*Rating Quantity and Rating */}
//                   {org.ratingsAverage > 0 && org.ratingsQuantity > 0 && (
//                     <Typography level="body2" color="text.secondary">
//                       Ratings: {org.ratingsAverage}⭐ ( {org.ratingsQuantity} )
//                     </Typography>
//                   )}

//                   {/* Last Service */}
//                   {org.latestService && (
//                     <Typography level="body2" color="text.secondary">
//                       Last Service:&nbsp;
//                       {formatDate(org.latestService, "en-US", {
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </Typography>
//                   )}

//                   {/* Notes */}
//                   <Typography level="body2" color="text.secondary">
//                     Note: {org.notes}
//                   </Typography>
//                 </Box>

//                 {/* Actions */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     gap: 1,
//                     mt: 2,
//                   }}
//                 >
//                   <Button
//                     variant="plain"
//                     startDecorator={<MdEdit />}
//                     onClick={() => handleAction(org.id, "edit")}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="soft"
//                     color="danger"
//                     startDecorator={<MdDelete />}
//                     onClick={() => handleAction(org.id, "delete")}
//                   >
//                     Delete
//                   </Button>
//                 </Box>
//               </Card>
//             ))}
//           </Box>
//         ) : (
//           // Table View
//           // responsive styles in styles/mediaquery.css
//           <Box className="responsive-table">
//             <Table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Phone</th>
//                   <th>Quantity</th>
//                   <th>Rating</th>
//                   <th>Last Service</th>
//                   <th style={{ textAlign: "center" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody
//                 style={{
//                   cursor: "pointer",
//                 }}
//               >
//                 {data.map((org) => (
//                   <tr key={org.id}>
//                     <td>{org.name}</td>
//                     <td>{org.phone}</td>
//                     <td>{org.ratingsQuantity}</td>
//                     <td>{org.ratingsAverage ? org.ratingsAverage : "N/A"}⭐</td>
//                     <td>
//                       {formatDate(org.latestService, "ka-ge", {
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </td>
//                     <td>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           gap: 1,
//                           justifyContent: "center",
//                         }}
//                       >
//                         <IconButton
//                           variant="plain"
//                           color="primary"
//                           onClick={() => handleAction(org.id, "edit")}
//                         >
//                           <MdEdit />
//                         </IconButton>
//                         <IconButton
//                           variant="plain"
//                           color="danger"
//                           onClick={() => handleAction(org.id, "delete")}
//                         >
//                           <MdDelete />
//                         </IconButton>
//                       </Box>
//                     </td>
//                   </tr>
//                 ))}
//                 <EditModal
//                   isOpen={editModalOpen}
//                   onClose={() => setEditModalOpen(false)}
//                   data={currentData}
//                   onSave={(updatedData) =>
//                     handleEdit(updatedData.id, updatedData)
//                   }
//                 />
//               </tbody>
//             </Table>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default DataDisplay;
