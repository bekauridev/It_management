import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useEffect, useState } from "react";
import { Box, Button, Typography, useColorScheme } from "@mui/joy";
import { LuMoon, LuSun } from "react-icons/lu";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const isLightMode = mode === "light";

  // necessary for server-side rendering
  // because mode is undefined on the server
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  return (
    <Box
      sx={{
        backgroundColor: "background.level2",
        borderRadius: "50%",
        p: "2px 11px",
        display: "block",
      }}
    >
      <Button
        variant="none"
        sx={{ p: 0 }}
        onClick={() => setMode(isLightMode ? "dark" : "light")}
      >
        {isLightMode ? <LuMoon size={18} /> : <LuSun size={18} />}
      </Button>
    </Box>
  );
}

export default ModeToggle;
