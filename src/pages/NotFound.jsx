import { Box, Typography, Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.level1",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        level="h1"
        component="h1"
        sx={{
          fontSize: { xs: "4rem", sm: "5rem", md: "6rem" },
          mb: 2,
          fontWeight: "bold",
          color: "primary.plainColor",
          textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%, 100%": { transform: "scale(1)", opacity: 1 },
            "50%": { transform: "scale(1.1)", opacity: 0.9 },
          },
        }}
      >
        404
      </Typography>
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem" },
          mb: 1.5,
          color: "neutral.plainColor",
        }}
      >
        უი! გვერდი ვერ მოიძებნა 😢
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: "1rem", sm: "1.20rem" },
          mb: 2,
          color: "neutral.plainColor",
          maxWidth: "600px",
        }}
      >
        ალბათ არასწორ მისამართზე მოხვდით ან გვერდი არ არსებობს. მთავარ გვერდზე
        დაბრუნდით და სცადეთ თავიდან.
      </Typography>
      <Button
        variant="soft"
        color="primary"
        size="md"
        onClick={handleGoHome}
        sx={{
          mt: 2,
          px: { xs: 2, sm: 4 },
          py: { xs: 1, sm: 1.5 },
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        დაბრუნდით მთავარ გვერდზე
      </Button>
    </Box>
  );
};

export default NotFound;
