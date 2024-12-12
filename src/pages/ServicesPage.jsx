import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Link,
} from "@mui/joy";
import { FaDesktop, FaTools, FaRegWindowMaximize, FaCog } from "react-icons/fa";

const ServicesPage = () => {
  return (
    <Box sx={{ bgcolor: "background.body", py: 4, px: 2, mt: 10 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          level="h3"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          ჩვენი სერვისები
        </Typography>
        <Typography level="h6" sx={{ color: "text.secondary", mt: 2 }}>
          აირჩიეთ ჩვენი პროფესიონალური სერვისები და ზრუნვა თქვენი
          კომპიუტერისთვის.
        </Typography>
      </Box>

      {/* Services Grid */}
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "center",
        }}
      >
        {/* Service 1 - Computer Cleaning */}
        <Grid xs={12} sm={6} md={4} lg={3}>
          <Card
            variant="outlined"
            sx={{ boxShadow: "md", borderRadius: "md", height: "100%" }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                height: 140,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: "md",
                borderTopRightRadius: "md",
              }}
            >
              <FaDesktop size={50} color="white" />
            </Box>
            <CardContent>
              <Typography level="h6" sx={{ fontWeight: "bold" }}>
                კომპიუტერის წმენდა
              </Typography>
              <Typography level="body2" sx={{ color: "text.secondary" }}>
                სწრაფი და ეფექტური კომპიუტერის გაწმენდა, რომელიც აუმჯობესებს
                სისტემის მუშაობას.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Service 2 - Deep Parts Cleaning */}
        <Grid xs={12} sm={6} md={4} lg={3}>
          <Card
            variant="outlined"
            sx={{ boxShadow: "md", borderRadius: "md", height: "100%" }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                height: 140,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: "md",
                borderTopRightRadius: "md",
              }}
            >
              <FaTools size={50} color="white" />
            </Box>
            <CardContent>
              <Typography level="h6" sx={{ fontWeight: "bold" }}>
                ნაწილების ღრმა წმენდა
              </Typography>
              <Typography level="body2" sx={{ color: "text.secondary" }}>
                კომპიუტერის ყველა ნაწილზე ღრმა წმენდა, რაც უზრუნველყოფს უფრო
                სტაბილურ და სწრაფ მუშაობას.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Service 3 - Fresh Windows Installation */}
        <Grid xs={12} sm={6} md={4} lg={3}>
          <Card
            variant="outlined"
            sx={{ boxShadow: "md", borderRadius: "md", height: "100%" }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                height: 140,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: "md",
                borderTopRightRadius: "md",
              }}
            >
              <FaRegWindowMaximize size={50} color="white" />
            </Box>
            <CardContent>
              <Typography level="h6" sx={{ fontWeight: "bold" }}>
                ვინდოუსის გადაყენება
              </Typography>
              <Typography level="body2" sx={{ color: "text.secondary" }}>
                ახალი და სუფთა Windows-ის ინსტალაცია, რათა თავიდან აიცილოთ მავნე
                პროგრამები და შეცდომები.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Service 4 - Software Support */}
        <Grid xs={12} sm={6} md={4} lg={3}>
          <Card
            variant="outlined"
            sx={{ boxShadow: "md", borderRadius: "md", height: "100%" }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                height: 140,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: "md",
                borderTopRightRadius: "md",
              }}
            >
              <FaCog size={50} color="white" />
            </Box>
            <CardContent>
              <Typography level="h6" sx={{ fontWeight: "bold" }}>
                პროგრამული უზრინველყოფა
              </Typography>
              <Typography level="body2" sx={{ color: "text.secondary" }}>
                პროფესიონალური პროგრამული უზრუნველყოფის მხარდაჭერა და
                პრობლემების მოგვარება.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Link href="/contact" underline="none">
          <Button
            variant="solid"
            color="primary"
            size="lg"
            sx={{ width: "200px" }}
          >
            მიიღეთ კონსულტაცია
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ServicesPage;
