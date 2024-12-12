import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";

const ContactPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        px: 4,
        bgcolor: "background.level1",
      }}
    >
      <Typography level="h3" mb={2}>
        დაგვიკავშირდით
      </Typography>
      <Card
        sx={{
          maxWidth: 400,
          p: 3,
          borderRadius: "md",
          boxShadow: "lg",
          bgcolor: "background.surface",
        }}
      >
        <CardContent>
          <Typography level="body1" mb={1}>
            <strong>ტელეფონი:</strong> +995 558 78 77 49
          </Typography>
          <Typography level="body1" mb={1}>
            <strong>ელ.ფოსტა:</strong> beqauri.forwork@gmail.com
          </Typography>
          <Typography level="body1">
            <strong>მისამართი:</strong> თბილისი,საქართველო
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactPage;
