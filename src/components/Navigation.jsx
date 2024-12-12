import { useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { Button } from "@mui/joy";

import ThemeToggle from "./ThemeToggle";
import HamburgerIcon from "./ui/icons/HamburgerIcon";
import CloseIcon from "./ui/icons/CloseIcon";
import useAuthContext from "../hooks/useAuthContext";

export default function Navigation() {
  const { user } = useAuthContext();

  const [open, setOpen] = useState(false);
  const mainPageHref = user ? "/" : "/";
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box>
      {/* Navbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: {
            xs: "26px",
            sm: "38px",
            md: "38px",
            lg: "48px ",
          },
          paddingY: {
            xs: "16px",
            sm: "24px",
            md: "24px",
            lg: "24px",
          },
          bgcolor: "transparent",
          backdropFilter: "blur(10px)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        {/* Branding */}
        <Typography
          level="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "primary.plainColor",
          }}
        >
          BekauriDev
        </Typography>

        {/* Links for larger screens */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
          }}
        >
          <Link href={mainPageHref} underline="none" color="neutral.plainColor">
            მთავარი
          </Link>

          <Link href="/about" underline="none" color="neutral.plainColor">
            ჩვენს შესახებ
          </Link>
          <Link href="/services" underline="none" color="neutral.plainColor">
            სერვისები
          </Link>
          <Link href="/contact" underline="none" color="neutral.plainColor">
            <Button
              sx={{
                fontSize: "16px",
              }}
            >
              დაგვიკავშირდი
            </Button>
          </Link>
        </Box>

        {/* Hamburger Menu Icon for smaller screens */}
        <IconButton
          sx={{ display: { xs: "inline-flex", md: "none" } }}
          onClick={toggleDrawer}
          variant="plain"
          size="sm"
        >
          <HamburgerIcon />
        </IconButton>
      </Box>

      {/* Drawer for smaller screens */}
      <Drawer
        anchor="right"
        variant="outlined"
        invertedColors
        open={open}
        onClose={toggleDrawer}
        size={"sm"}
        sx={[
          open
            ? {
                "--Drawer-transitionDuration": "0.4s",
                "--Drawer-transitionFunction":
                  "cubic-bezier(0.79,0.14,0.15,0.86)",
              }
            : {
                "--Drawer-transitionDuration": "0.2s",
                "--Drawer-transitionFunction": "cubic-bezier(0.77,0,0.18,1)",
              },
          {
            display: { md: "none" },
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <IconButton onClick={toggleDrawer} size="lg">
            <CloseIcon />
          </IconButton>
        </Box>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          <ListItem>
            <Link
              href={mainPageHref}
              underline="none"
              color="neutral.plainColor"
              onClick={toggleDrawer}
            >
              მთავარი
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="/about"
              underline="none"
              color="neutral.plainColor"
              onClick={toggleDrawer}
            >
              ჩვენს შესახებ
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="/services"
              underline="none"
              color="neutral.plainColor"
              onClick={toggleDrawer}
            >
              სერვისები
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="/contact"
              underline="none"
              color="neutral.plainColor"
              onClick={toggleDrawer}
            >
              <Button
                sx={{
                  mt: "5px",
                  fontSize: "15px",
                }}
              >
                დაგვიკავშირდი
              </Button>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
