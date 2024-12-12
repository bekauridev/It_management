import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRequest } from "../utils/fetchRequest";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

import FormHelperText from "@mui/joy/FormHelperText";
import Stack from "@mui/joy/Stack";
import { getPasswordStrength, validatePassword } from "../utils/authValidation";
import AlertMessage from "../components/AlertMessage";
import Spinner from "../components/ui/Spinner";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token } = useParams(); // Get the reset token from the URL
  const navigate = useNavigate();

  const [passwordStrengthScore, passwordStrengthMessage] =
    getPasswordStrength(password);
  useEffect(() => {
    if (!token) {
      setError("Invalid reset link.");
    }
  }, [token]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Clear password error on change
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    setPasswordConfirmError(""); // Clear confirm password error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validate password strength
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      setLoading(false);
      return;
    }

    // Check for password match
    if (password !== passwordConfirm) {
      setPasswordConfirmError("პაროლები არ ემთხვევა.");
      setLoading(false);
      return;
    }

    try {
      // Send password reset request with token and new password
      await fetchRequest(`auth/resetPassword/${token}`, "PATCH", {
        password,
        passwordConfirm,
      });
      setSuccess("პაროლი წარმატებით შეიცვალა.");
      setTimeout(() => {
        navigate("/auth/login"); // Redirect to login after successful reset
      }, 1500);
    } catch (err) {
      setError("პაროლის აღდგენა ვერ მოხერხდა. გთხოვთ, სცადოთ ხელახლა.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.level1",
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          bgcolor: "background.surface",
          p: 4,
          borderRadius: "md",
          boxShadow: "lg",
        }}
      >
        <Typography level="h3" mb={2}>
          Reset Your Password
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Stack gap={2}>
            <FormControl error={!!passwordError}>
              <FormLabel>New Password</FormLabel>
              <Stack
                spacing={0.5}
                sx={{
                  "--hue": 120 * (passwordStrengthScore / 4), // Dynamically adjust color based on score
                }}
              >
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  disabled={loading}
                />
                <FormHelperText
                  level="body-xs"
                  sx={{
                    alignSelf: "flex-start",
                    color: `hsl(var(--hue), 90%, 40%)`, // Green for strong, red for weak
                  }}
                >
                  {/* Display password strength messages if no error */}
                  {!passwordError && passwordStrengthMessage}
                  {passwordError && (
                    <Typography level="body2" sx={{ color: "#C41C1C" }}>
                      {passwordError}
                    </Typography>
                  )}
                </FormHelperText>
              </Stack>
            </FormControl>

            <FormControl error={!!passwordConfirmError}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                required
                disabled={loading}
              />
              {passwordConfirmError && (
                <FormHelperText>{passwordConfirmError}</FormHelperText>
              )}
            </FormControl>
            {error && (
              <AlertMessage message={error} color="danger"></AlertMessage>
            )}
            {success && (
              <AlertMessage message={success} color="success"></AlertMessage>
            )}
            <Button
              fullWidth
              variant="solid"
              type="submit"
              disabled={loading}
              sx={{
                mt: 2,
              }}
            >
              {loading ? <Spinner /> : "პაროლის აღდგენა"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
