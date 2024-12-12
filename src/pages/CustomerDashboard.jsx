import { BASE_URL } from "../config/config";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Button,
} from "@mui/joy";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Spinner from "../components/ui/Spinner"; // Loading Spinner
import { fetchRequest } from "../utils/fetchRequest";

const CustomerDashboard = () => {
  const { customerId, setCustomerId } = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await fetchRequest(
          `customers/64d1b3c1c4a9e76f8b2c5678?populate=servicesHistory`,
          "GET"
        );

        if (data.status === "success") {
          setCustomerData(data.data.doc);
        } else {
          setError("დაფიქსირდა შეცდომა მომხმარებლის მონაცემების ჩატვირთვისას");
        }
      } catch (err) {
        setError("სერვერთან დაკავშირების შეცდომა");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          textAlign: "center",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography level="h6" color="danger">
          {error}
        </Typography>
        <Button
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
          color="primary"
        >
          სცადეთ ხელახლა
        </Button>
      </Box>
    );
  }

  const { name, phone, email, notes, servicesHistory } = customerData;

  return (
    <Box sx={{ bgcolor: "background.body", py: 4, px: 2, mt: 12 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          level="h3"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          მომხმარებლის პანელი
        </Typography>
        <Typography level="h6" sx={{ color: "text.secondary", mt: 1 }}>
          აქ შეგიძლიათ იხილოთ თქვენი სერვისების ისტორია.
        </Typography>
      </Box>

      {/* Customer Info */}
      <Box
        sx={{
          mb: 6,
          p: 3,
          borderRadius: "md",
          boxShadow: "lg",
          bgcolor: "background.surface",
          textAlign: "center",
        }}
      >
        <Typography level="h5" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography level="body2" sx={{ mt: 1 }}>
          <strong>ტელეფონი:</strong> {phone}
        </Typography>
        <Typography level="body2" sx={{ mt: 1 }}>
          <strong>ელ.ფოსტა:</strong> {email}
        </Typography>
        {notes && (
          <Typography level="body2" sx={{ mt: 1, fontStyle: "italic" }}>
            <strong>შენიშვნები:</strong> {notes}
          </Typography>
        )}
      </Box>

      {/* Services History */}
      <Typography
        level="h5"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        სერვისების ისტორია
      </Typography>
      <Grid container spacing={3}>
        {servicesHistory.map((service) => (
          <Grid xs={12} md={6} key={service._id}>
            <Card
              variant="outlined"
              sx={{
                boxShadow: "md",
                borderRadius: "md",
                height: "100%",
                p: 2,
              }}
            >
              <CardContent>
                <Typography level="h6" sx={{ fontWeight: "bold" }}>
                  სერვისი: {service.serviceDetails || "—"}
                </Typography>
                <Typography level="body2" sx={{ mt: 1 }}>
                  <strong>თანამშრომელი:</strong> {service.employee.name}
                </Typography>
                <Typography level="body2" sx={{ mt: 1 }}>
                  <strong>თარიღი:</strong>{" "}
                  {format(new Date(service.date), "yyyy-MM-dd")}
                </Typography>
                <Typography level="body2" sx={{ mt: 1 }}>
                  <strong>რეიტინგი:</strong> {service.rating} / 5
                </Typography>
                {service.feedback && (
                  <Typography level="body2" sx={{ mt: 1 }}>
                    <strong>კომენტარი:</strong> {service.feedback}
                  </Typography>
                )}
              </CardContent>
              <Divider />
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Chip size="sm" color="success">
                  მომსახურება დასრულებულია
                </Chip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomerDashboard;
