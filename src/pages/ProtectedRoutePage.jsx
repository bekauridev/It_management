import React, { useState } from "react";
import { Box, Typography, Button, Link, Tooltip, IconButton } from "@mui/joy";
import { FaQuestion } from "react-icons/fa";

/**
 * ProtectedRoutePage displays a welcome message for authenticated users.
 */
const ProtectedRoutePage = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  const reasons = `
    1. მისამართი, რომელსაც ეძებთ, არის დაცული. მასზე წვდომის მოსაპოვებლად ავტორიზაციაა საჭირო.\n
    2. თქვენი ანგარიშის სტატუსი არ გაძლევთ წვდომის საშუალებას.\n
    3. თქვენ არ ხართ ავტორიზებული, გთხოვთ, შეხვიდეთ სისტემაში.
  `;

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: { xs: "1rem", sm: "2rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "background.level1",
        position: "relative", // For floating icon
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          width: "100%",
          padding: { xs: "0 1rem", sm: "0" },
        }}
      >
        <Typography
          level="h2"
          sx={{
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2.25rem" },
          }}
        >
          {`დაცული გვერდი`}
        </Typography>
        <Typography
          level="body1"
          sx={{
            mb: 3,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {`ამ გვერდზე წვდომა მხოლოდ ავტორიზებულ მომხმარებლებს აქვთ. მადლობას გიხდით, რომ ჩვენს პლატფორმას იყენებთ.`}
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href="/auth/signup" level="body-md" underline="hover">
            <Button
              variant="soft"
              sx={{
                mr: { sm: 2 },
                mb: { xs: 2, sm: 0 },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              რეგისტრაცია
            </Button>
          </Link>
          <Link href="/auth/login" level="body-md" underline="hover">
            <Button
              variant="soft"
              sx={{
                width: { xs: "100%", sm: "auto" },
              }}
            >
              შესვლა
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Floating Help Icon with Tooltip */}
      <Box
        sx={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
        }}
      >
        <Tooltip
          open={showTooltip}
          title={
            <Box
              sx={{
                textAlign: "left",
                fontSize: "0.875rem",
                lineHeight: "1.5",
                whiteSpace: "pre-wrap", // Preserve line breaks
              }}
            >
              <Typography
                level="title-md"
                sx={{
                  textAlign: "center",
                  pt: 2,
                  fontWeight: "bold",
                }}
              >
                რატომ ვხედავ ამ გვერდს?
              </Typography>
              {reasons}
            </Box>
          }
          placement="top"
        >
          <IconButton
            onClick={toggleTooltip}
            sx={{
              backgroundColor: "background.level2",
              borderRadius: "50%",
              width: "2rem",
              height: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "sm",
              "&:hover": {
                boxShadow: "0px",
                backgroundColor: "background.level1",
              },
            }}
          >
            <FaQuestion size={15} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ProtectedRoutePage;
