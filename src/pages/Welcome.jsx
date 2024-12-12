import { Box, Typography, Button, Link } from "@mui/joy";
import ArrowRight from "../components/ui/icons/ArrowRight";

function Welcome() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.level1",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Box
        component="div"
        // sx={{
        //   position: "absolute",
        //   inset: "50% auto auto 50%",
        //   transform: "translate(-50%, -50%)",
        //   textAlign: { xs: "center", sm: "left" },
        //   maxWidth: {
        //     xs: "320px",
        //     sm: "600px",
        //     md: "700px",
        //     lg: "800px",
        //   },

        //   px: { xs: "5px", sm: 4, md: 6 },
        //   marginTop: "68px",
        //   margninBottom: "120px",
        //   // backgroundColor: "background.level2",
        // }}
        sx={{
          position: "absolute",
          inset: "50% auto auto 50%",
          transform: "translate(-50%, -50%)",
          textAlign: { xs: "center", sm: "left" },
          width: "100%", // Allow it to use full width
          maxWidth: {
            xs: "320px",
            sm: "600px",
            md: "700px",
            lg: "800px",
          },
          minWidth: "280px", // Ensure it doesn't shrink too much
          px: { xs: 2, sm: 4, md: 6 }, // Consistent padding
          // marginTop: {
          //   xs: "20px",
          //   sm: "40px",
          //   md: "60px",
          //   lg: "20px",
          // },
          // marginBottom: {
          //   xs: "20px",
          //   sm: "40px",
          //   md: "60px",
          //   lg: "80px",
          //   xl: "100px",
          // },
          marginBottom: "100px",
          marginTop: "20px",
        }}
      >
        <Typography
          level="h5"
          component="h1"
          sx={{
            fontWeight: "xl",
            fontSize: {
              default: "1.5rem",
              xs: "1.7rem",
              sm: "2.5rem",
              md: "3rem",
              lg: "3.5rem",
            },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          აამუშავე სწრაფად და სუფთად!
        </Typography>

        <Typography
          textColor="text.secondary"
          sx={{
            fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
            lineHeight: { xs: "1.5", sm: "1.75", md: "2" },
            mt: 2,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          პროფესიონალური IT სერვისები თქვენი კომპიუტერის სისწრაფისა და
          სტაბილურობისთვის.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "flex-start",
              md: "flex-start",
            }, // Always left-align on medium and larger
            width: "100%",
          }}
        >
          <Link href="/auth/signup">
            <Button
              size="lg"
              endDecorator={<ArrowRight />}
              sx={{
                mt: {
                  xs: "20px", // Small screens (mobile)
                  sm: "24px", // Larger mobile or tablet
                  lg: "24px", // Large screens (desktop)
                },
                // mt: 3,
                // margniBottom: 3,
                mb: {
                  xs: "5px", // Small screens (mobile)
                  sm: "20px", // Larger mobile or tablet
                  lg: "20px", // Large screens (desktop)
                },
                // px: { xs: 3, md: 4 },
              }}
            >
              განაგრძე
            </Button>
          </Link>
        </Box>

        <Typography sx={{ mt: 1 }}>
          უკვე გაქვს ანგარიში?
          <Link
            sx={{
              fontWeight: "lg",
              textAlign: { xs: "center", sm: "left" },
              paddingLeft: "4px",
            }}
            underline="always"
            href="/auth/login"
          >
            ავტორიზაცია
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Welcome;
