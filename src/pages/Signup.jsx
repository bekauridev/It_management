// import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
// import Input from "@mui/joy/Input";
// import FormHelperText from "@mui/joy/FormHelperText";
// import Typography from "@mui/joy/Typography";
// import Stack from "@mui/joy/Stack";
// import Divider from "@mui/joy/Divider";
// import Link from "@mui/joy/Link";

// import { useState } from "react";
// import zxcvbn from "zxcvbn";
// import useAuthContext from "../hooks/useAuthContext";

// import GoogleIcon from "../components/ui/icons/GoogleIcon";
// import AlertMessage from "../components/AlertMessage";
// import Spinner from "../components/ui/Spinner";

// import {
//   getPasswordStrength,
//   validateEmail,
//   validatePassword,
// } from "../utils/authValidation";
// import { useNavigate, useLocation } from "react-router-dom";
// import useSignUp from "../hooks/useSignUp";

// export default function SignUp() {
//   // const { signup, loading, error, clearError } = useAuthContext();
//   const { signup, loading, error } = useSignUp();

//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   //Field values
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   //Field errors
//   const [nameError, setNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");

//   // Form submission
//   const [submitted, setSubmitted] = useState(false);
//   // Button disable
//   const [disableBtn, setDisableBtn] = useState(false);
//   // password strength validator returned state
//   const [passwordStrengthScore, passwordStrengthMessage] =
//     getPasswordStrength(password);

//   // Set field values
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSubmitted(false);
//     setDisableBtn(false);

//     if (name === "name") setName(value);
//     if (name === "email") setEmail(value);
//     if (name === "password") setPassword(value);
//     if (name === "confirmPassword") setConfirmPassword(value);
//   };

//   // / Field validations Returns error message
//   const validateName = (value) => {
//     if (!value) return "სახელი სავალდებულოა.";
//     return "";
//   };

//   const validateConfirmPassword = (value) => {
//     if (!value) return "პაროლის დადასტურება სავალდებულოა.";
//     if (value !== password) return "პაროლები არ ემთხვევა.";
//     return "";
//   };

//   // Password strength checker using (zxcvbn)

//   // Removes errors on focus
//   const handleFocus = (field) => {
//     if (field === "name") setNameError("");
//     if (field === "email") setEmailError("");
//     if (field === "password") setPasswordError("");
//     if (field === "confirmPassword") setConfirmPasswordError("");

//     setDisableBtn(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setSubmitted(true);

//     // Validate input fields
//     const nameValidationError = validateName(name);
//     const emailValidationError = validateEmail(email);
//     const passwordValidationError = validatePassword(password, true);
//     const confirmPasswordValidationError =
//       validateConfirmPassword(confirmPassword);

//     // Set validation errors
//     setNameError(nameValidationError);
//     setEmailError(emailValidationError);
//     setPasswordError(passwordValidationError);
//     setConfirmPasswordError(confirmPasswordValidationError);

//     // If there are validation errors, stop the submission
//     if (
//       nameValidationError ||
//       emailValidationError ||
//       passwordValidationError ||
//       confirmPasswordValidationError ||
//       passwordStrengthScore < 2
//     ) {
//       setDisableBtn(true);
//       return;
//     }

//     // Ensure password strength is sufficient
//     if (passwordStrengthScore < 2) {
//       setPasswordError("პაროლი უნდა იყოს ძლიერი.");
//       return;
//     }

//     // Attempt to signup
//     await signup(name, email, password, confirmPassword);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         minHeight: "100vh",
//         justifyContent: "center",
//         bgcolor: "background.level1",
//       }}
//     >
//       <Box
//         component="main"
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           gap: 1,
//           maxWidth: 450,
//           width: "100%",
//           marginTop: "48px",
//           marginBottom: "64px",
//           px: 4,
//           py: 6,
//         }}
//       >
//         {error && <AlertMessage color="danger" message={error} />}
//         <Typography level="h3">რეგისტრაცია</Typography>
//         <Typography fontSize={"15px"} marginBottom={"24px"}>
//           უკვე გაქვთ ანგარიში?
//           <Link
//             href="/auth/login"
//             level="body2"
//             paddingLeft={"5px"}
//             underline="always"
//           >
//             შესვლა
//           </Link>
//         </Typography>
//         <Button fullWidth variant="soft" startDecorator={<GoogleIcon />}>
//           Continue with Google
//         </Button>
//         <Divider>ან</Divider>

//         <form onSubmit={(e) => handleSubmit(e)} noValidate>
//           <Stack gap={2}>
//             <FormControl error={submitted && !!nameError}>
//               <FormLabel>სახელი</FormLabel>
//               <Input
//                 type="text"
//                 name="name"
//                 value={name}
//                 onChange={(e) => handleChange(e)}
//                 onFocus={() => handleFocus("name")}
//                 required
//               />
//               {submitted && nameError && (
//                 <FormHelperText>{nameError}</FormHelperText>
//               )}
//             </FormControl>
//             <FormControl error={submitted && !!emailError}>
//               <FormLabel>ელ.ფოსტა</FormLabel>
//               <Input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => handleChange(e)}
//                 onFocus={() => handleFocus("email")}
//                 required
//               />
//               {submitted && emailError && (
//                 <FormHelperText>{emailError}</FormHelperText>
//               )}
//             </FormControl>
//             <FormControl error={submitted && !!passwordError}>
//               <FormLabel>პაროლი</FormLabel>
//               <Stack
//                 spacing={0.5}
//                 sx={{
//                   "--hue": 120 * (passwordStrengthScore / 4),
//                 }}
//               >
//                 <Input
//                   type="password"
//                   name="password"
//                   value={password}
//                   onChange={(e) => handleChange(e)}
//                   onFocus={() => handleFocus("password")}
//                   required
//                 />
//                 <FormHelperText
//                   level="body-xs"
//                   sx={{
//                     alignSelf: "flex-start",
//                     color: `hsl(var(--hue) 90% 40%)`,
//                   }}
//                 >
//                   {/* Display password strength messages if no error */}
//                   {!passwordError && passwordStrengthMessage}

//                   {submitted && passwordError && (
//                     <Typography level="body2" sx={{ color: "#C41C1C" }}>
//                       {passwordError}
//                     </Typography>
//                   )}
//                 </FormHelperText>
//               </Stack>

//               {/* Password strength indicator */}
//             </FormControl>
//             <FormControl error={submitted && !!confirmPasswordError}>
//               <FormLabel>პაროლის დადასტურება</FormLabel>
//               <Input
//                 type="password"
//                 name="confirmPassword"
//                 value={confirmPassword}
//                 onChange={(e) => handleChange(e)}
//                 onFocus={() => handleFocus("confirmPassword")}
//                 required
//               />
//               {submitted && confirmPasswordError && (
//                 <FormHelperText>{confirmPasswordError}</FormHelperText>
//               )}
//             </FormControl>
//             <Button
//               fullWidth
//               variant="solid"
//               type="submit"
//               disabled={disableBtn || loading}
//             >
//               {loading ? <Spinner /> : "რეგისტრაცია"}
//             </Button>
//           </Stack>
//         </form>
//       </Box>
//     </Box>
//   );
// }

import { useForm } from "react-hook-form";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import Link from "@mui/joy/Link";

import GoogleIcon from "../components/ui/icons/GoogleIcon";
import AlertMessage from "../components/AlertMessage";
import Spinner from "../components/ui/Spinner";
import { useNavigate, useLocation } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import { getPasswordStrength } from "../utils/authValidation";

export default function SignUp() {
  const { signup, isLoading, error } = useSignUp();
  console.log(isLoading);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password", "");

  // Password strength
  const [passwordStrengthScore, passwordStrengthMessage] =
    getPasswordStrength(password);

  const onSubmit = (data) => {
    signup({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.confirmPassword, // Ensure key matches API expectation
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        bgcolor: "background.level1",
      }}
    >
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
          maxWidth: 450,
          width: "100%",
          marginTop: "48px",
          marginBottom: "64px",
          px: 4,
          py: 6,
        }}
      >
        {error && <AlertMessage color="danger" message={error} />}
        <Typography level="h3">რეგისტრაცია</Typography>
        <Typography fontSize={"15px"} marginBottom={"24px"}>
          უკვე გაქვთ ანგარიში?
          <Link
            href="/auth/login"
            level="body2"
            paddingLeft={"5px"}
            underline="always"
          >
            შესვლა
          </Link>
        </Typography>

        <Button fullWidth variant="soft" startDecorator={<GoogleIcon />}>
          Continue with Google
        </Button>
        <Divider>ან</Divider>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack gap={2}>
            <FormControl error={!!errors.name}>
              <FormLabel>სახელი</FormLabel>
              <Input
                {...register("name", { required: "სახელი სავალდებულოა." })}
              />
              {errors.name && (
                <FormHelperText>{errors.name.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.email}>
              <FormLabel>ელ.ფოსტა</FormLabel>
              <Input
                type="email"
                {...register("email", {
                  required: "ელ.ფოსტა აუცილებელია",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "ელ.ფოსტის ფორმატი არასწორია",
                  },
                })}
              />
              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.password}>
              <FormLabel>პაროლი</FormLabel>
              <Stack
                spacing={0.5}
                sx={{
                  "--hue": 120 * (passwordStrengthScore / 4),
                }}
              >
                <Input
                  type="password"
                  {...register("password", {
                    required: "პაროლი სავალდებულოა.",
                    minLength: {
                      value: 8,
                      message: "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს.",
                    },
                  })}
                />
                <FormHelperText
                  level="body-xs"
                  sx={{
                    alignSelf: "flex-start",
                    color: `hsl(var(--hue) 90% 40%)`,
                  }}
                >
                  {/* Show password strength indicator */}
                  {!errors.password && passwordStrengthMessage}

                  {errors.password && (
                    <Typography level="body2" sx={{ color: "#C41C1C" }}>
                      {errors.password.message}
                    </Typography>
                  )}
                </FormHelperText>
              </Stack>
            </FormControl>

            <FormControl error={!!errors.confirmPassword}>
              <FormLabel>პაროლის დადასტურება</FormLabel>
              <Input
                type="password"
                {...register("confirmPassword", {
                  required: "პაროლის დადასტურება სავალდებულოა.",
                  //   validate: (value) =>
                  //     value === password || "პაროლები არ ემთხვევა.",
                  // })}
                  validate: (value) => {
                    if (value !== password) {
                      return "პაროლები არ ემთხვევა. ";
                    }
                    return true; // Validation passes
                  },
                })}
              />
              {errors.confirmPassword && (
                <FormHelperText>
                  {errors.confirmPassword.message}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              fullWidth
              variant="solid"
              type="submit"
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? <Spinner /> : "რეგისტრაცია"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
