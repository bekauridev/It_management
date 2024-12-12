import { Box } from "@mui/joy";
import Spinner from "../components/ui/Spinner";

function LoaddingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.level1",
        // margin: "20px",
        height: "100vh",
      }}
    >
      <Spinner size="lg" thickness={5} />
    </Box>
  );
}

export default LoaddingPage;
