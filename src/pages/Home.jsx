import { Box, Typography, Button, Container, Link } from "@mui/joy";
function Home() {
  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          marginTop: "64px",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography level="h3" component="h1">
          Hi, This is main congrats!
        </Typography>
        <Typography level="body1">
          This is the basic layout using Joy UI.
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Container
        sx={{
          my: 4,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography level="h4" component="h2" sx={{ mb: 2 }}>
          Explore Our Features
        </Typography>
        <Typography level="body2" sx={{ textAlign: "center", maxWidth: 600 }}>
          Here you can explore a variety of features and services we offer. Use
          the navigation menu to browse different sections of our platform.
        </Typography>

        <Link
          href="/adminPanel"
          level="body2"
          variant="soft"
          paddingLeft={"5px"}
          underline="hover"
          sx={{ mt: 3, padding: "6px 12px" }}
        >
          Are u admin ^^
        </Link>
      </Container>

      {/* Footer Section */}
      <Box
        sx={{
          backgroundColor: "neutral.300",
          py: 2,
          textAlign: "center",
          mt: "auto",
        }}
      >
        <Typography level="body3">
          © 2024 Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
