import React from "react";
import { Box, Typography, Card } from "@mui/joy";

const GenericCard = ({ title, fields }) => {
  return (
    <Card
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
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "xl",
        },
        // cursor: onClick ? "pointer" : "default",
      }}
      // onClick={onClick}
    >
      {/* Card Title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography level="h5" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      {/* Dynamic Fields */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          borderTop: "1px solid",
          borderColor: "divider",
          pt: 1.5,
        }}
      >
        {fields.map((field, index) => (
          <Typography key={index} level="body2" color="text.secondary">
            <strong>{field.label}: </strong> {field.value || "N/A"}
          </Typography>
        ))}
      </Box>
    </Card>
  );
};

export default GenericCard;
