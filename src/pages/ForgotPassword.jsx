import { useState } from "react";
import { fetchRequest } from "../utils/fetchRequest";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

import Spinner from "../components/ui/Spinner";
import { validateEmail } from "../utils/authValidation";
import AlertMessage from "../components/AlertMessage";
import { Divider, Link } from "@mui/joy";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/auth/login";
  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError("");
    setError(null); // Clear backend errors on change
    setDisableBtn(false);
    setSubmitted(false);
  };

  const handleFocus = () => {
    setEmailError(""); // Clear validation error on focus
    setDisableBtn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Validate email format
    const emailValidationError = validateEmail(email);
    setEmailError(emailValidationError);

    if (emailValidationError) {
      setDisableBtn(true);
      return; // Don't proceed if there's a validation error
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Send a password reset request to the server
      await fetchRequest("auth/forgotPassword", "POST", { email });
      setSuccess("პაროლის აღდგენის ბმული გაიგზავნა თქვენს ელფოსტაზე.");
      // setTimeout(() => {
      //   navigate("/auth/login"); // Redirect to login after success
      // }, 3000);
    } catch (err) {
      setError(
        "აღსანიშნავი ბმულის გაგზავნა ვერ მოხერხდა. გთხოვთ, სცადოთ ხელახლა ან შეცვალეთ ელ.ფოსტა"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.level1",
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          bgcolor: "background.surface",
          position: "relative",
          p: 5,

          borderRadius: "md",
          boxShadow: "lg",
        }}
      >
        <Typography level="h3" mb={2}>
          დაგავიწყდათ პაროლი?
        </Typography>
        <Typography mb={3}>
          შეიყვანეთ თქვენი ელ.ფოსტა ქვემოთ, რათა მიიღოთ პაროლის აღდგენის ბმული.
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <FormControl error={submitted && !!emailError} sx={{ mb: 2 }}>
            <FormLabel>ელ.ფოსტა</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={handleChange}
              onFocus={handleFocus}
              required
              disabled={loading}
            />
            {submitted && emailError && (
              <Typography level="body2" color="danger" mt={0.5}>
                {emailError}
              </Typography>
            )}
          </FormControl>

          {error && (
            <AlertMessage message={error} color="danger" sx={{ mb: 2 }} />
          )}
          {success && (
            <AlertMessage message={success} color="success" sx={{ mb: 2 }} />
          )}

          <Button
            fullWidth
            variant="solid"
            type="submit"
            disabled={disableBtn || loading}
            sx={{ mb: 2 }}
          >
            {loading ? <Spinner /> : "გაგზავნა"}
          </Button>

          <Divider>ან</Divider>

          <Link
            sx={{
              display: "block",
              textAlign: "center",
              mt: 2,
            }}
            onClick={() => navigate(from, { replace: true })}
            underline="always"
          >
            დაბრუნდი უკან
          </Link>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
