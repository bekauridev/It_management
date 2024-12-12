import { Box, Grid, Typography, IconButton, Button } from "@mui/joy";
import { useState } from "react";

import InstagramIcon from "../ui/icons/InstagramIcon";
import FacebookIcon from "../ui/icons/FacebookIcon";
import TikTokIcon from "../ui/icons/TikTokIcon";
import ModalWindow from "../ui/ModalWindow";

const Footer = () => {
  const [open, setOpen] = useState(false);

  const handleRedirect = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=mgproject888@gmail.com",
      "_blank"
    );
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "24px 16px",
        backgroundColor: "background.level1",
        borderTop: "1px solid",
        borderTopColor: "background.level3",
        marginTop: "auto",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Left Section */}
        <Grid xs={12} md={4} sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography level="body2" sx={{ fontWeight: "bold" }}>
            © BekauriDev {new Date().getFullYear()}
          </Typography>
        </Grid>

        {/* Middle Section: Social Icons */}

        <Grid xs={12} md={4} sx={{ textAlign: "center" }}>
          <IconButton
            component="a"
            variant="soft"
            href="https://facebook.com/"
            target="_blank"
            aria-label="Facebook-icon"
            sx={{ color: "text.secondary", margin: "0 8px" }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component="a"
            variant="soft"
            href="https://www.instagram.com/"
            target="_blank"
            aria-label="Instagram-icon"
            sx={{ color: "text.secondary", margin: "0 8px" }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            component="a"
            variant="soft"
            href="https://tiktok.com/"
            target="_blank"
            aria-label="TikTok-icon"
            sx={{ color: "text.secondary", margin: "0 8px" }}
          >
            <TikTokIcon />
          </IconButton>
        </Grid>

        {/* Right Section: Support Button */}
        <Grid xs={12} md={4} sx={{ textAlign: { xs: "center", md: "right" } }}>
          <Button
            size="md"
            variant="plain"
            color="primary"
            onClick={() => setOpen(true)}
            sx={{ textTransform: "none" }}
          >
            დახმარება
          </Button>
        </Grid>
      </Grid>
      <ModalWindow
        callBack={handleRedirect}
        open={open}
        setOpen={setOpen}
        title="დაუკავშირდით მხარდაჭერას"
        description="თქვენ აპირებთ Gmail-ის გახსნას მხარდაჭერასთან დასაკავშირებლად. გსურთ გაგრძელება?"
        primaryActionText="დიახ, გააგრძელე"
        closeActionText="გამოსვლა"
      />
    </Box>
  );
};

export default Footer;
