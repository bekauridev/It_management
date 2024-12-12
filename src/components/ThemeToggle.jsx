import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useEffect, useState } from "react";
import { Button, Typography, useColorScheme } from "@mui/joy";
import { LuMoon, LuSun } from "react-icons/lu";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  const isLightMode = mode === "light";

  // necessary for server-side rendering
  // because mode is undefined on the server
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Button
        variant={isLightMode ? "solid" : "outlined"}
        onClick={() => setMode(isLightMode ? "dark" : "light")}
        startDecorator={
          isLightMode ? <LuMoon size={18} /> : <LuSun size={18} />
        }
      >
        {isLightMode ? (
          <Typography level="xs" sx={{ paddingBottom: "2px" }}>
            მუქი
          </Typography>
        ) : (
          <Typography level="xs" sx={{ paddingBottom: "2px" }}>
            ღია
          </Typography>
        )}
      </Button>
    </div>
  );
}

export default ModeToggle;
