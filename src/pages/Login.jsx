// import { useNavigate, useLocation } from "react-router-dom";

// import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";

// import Divider from "@mui/joy/Divider";
// import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
// import FormHelperText from "@mui/joy/FormHelperText"; // Import FormHelperText

// import Link from "@mui/joy/Link";
// import Input from "@mui/joy/Input";
// import Typography from "@mui/joy/Typography";
// import Stack from "@mui/joy/Stack";

// import { useState } from "react";

// import useAuthContext from "../hooks/useAuthContext";
// import EyeIcon from "../components/ui/icons/EyeIcon";
// import EyeOffIcon from "../components/ui/icons/EyeOffIcon";
// import AlertMessage from "../components/AlertMessage";
// import Spinner from "../components/ui/Spinner";

// import { validateEmail, validatePassword } from "../utils/authValidation";
// import { useLogIn } from "../hooks/useLogIn";

// export default function Login() {
//   // const { login, loading, error, clearError } = useAuthContext();
//   const { login, isLoading, error } = useLogIn();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("beqauri.forwork@gmail.com");
//   const [password, setPassword] = useState("Giksona_313131");

//   const [showPassword, setShowPassword] = useState(false);
//   const [disableBtn, setDisableBtn] = useState(false);

//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSubmitted(false);
//     setDisableBtn(false);

//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "password") {
//       setPassword(value);
//     }
//   };
//   const handleFocus = (field) => {
//     setDisableBtn(false);
//     if (field === "email") {
//       setEmailError(""); // Clear email error on focus
//     } else if (field === "password") {
//       setPasswordError(""); // Clear password error on focus
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // clearError();
//     setSubmitted(true);
//     const emailValidationError = validateEmail(email);
//     const passwordValidationError = validatePassword(password);

//     setEmailError(emailValidationError);
//     setPasswordError(passwordValidationError);

//     if (emailValidationError || passwordValidationError) {
//       setDisableBtn(true);
//       return;
//     }

//     makeRequest();
//     if (!error) navigate("/home", { replace: true });
//   };

//   const makeRequest = () => {
//     login(email, password);
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
//       {/* Sign-In Form */}
//       <Box
//         component="main"
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           gap: 1,
//           maxWidth: 450,
//           marginTop: "48px",
//           marginBottom: "64px",
//           width: "100%",
//           px: 4,
//           py: 6,
//         }}
//       >
//         {error && <AlertMessage color="danger" message={error} />}

//         <Typography level="h3" textAlign="center" marginBottom={1.5}>
//           {/* შესვლა */}
//           ავტორიზაცია
//         </Typography>
//         <form onSubmit={(e) => handleSubmit(e)} noValidate>
//           <Stack gap={2}>
//             <FormControl error={submitted && !!emailError}>
//               <FormLabel>ელ.ფოსტა</FormLabel>
//               <Input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={handleChange}
//                 onFocus={() => handleFocus("email")}
//                 required
//               />
//               {submitted && emailError && (
//                 <FormHelperText>{emailError}</FormHelperText>
//               )}
//             </FormControl>

//             <FormControl error={submitted && !!passwordError}>
//               <FormLabel>პაროლი</FormLabel>
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={password}
//                 onChange={handleChange}
//                 onFocus={() => handleFocus("password")}
//                 required
//                 endDecorator={
//                   <span
//                     onClick={togglePasswordVisibility}
//                     style={{
//                       cursor: "pointer",
//                       height: "24px",
//                     }}
//                   >
//                     {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//                   </span>
//                 }
//               />
//               {submitted && passwordError && (
//                 <>
//                   <FormHelperText>{passwordError}</FormHelperText>
//                 </>
//               )}

//               <Link
//                 href="/forgot-password"
//                 level="body-md"
//                 sx={{
//                   // color: "primary.plainColor",
//                   marginTop: "10px",
//                   // ":hover": {
//                   //   color: "primary.solidHoverBg",
//                   // },
//                 }}
//                 justifyContent="flex-end"
//                 underline="hover"
//               >
//                 {/* დაგავიწყდა პაროლი?  */}
//                 პაროლის აღდგენა
//               </Link>
//             </FormControl>

//             <Stack direction="row" justifyContent="flex-end">
//               <Button
//                 fullWidth
//                 variant="solid"
//                 type="submit"
//                 disabled={disableBtn || isLoading}
//               >
//                 {isLoading ? <Spinner /> : "ავტორიზაცია"}
//               </Button>
//             </Stack>
//             <Divider>ან</Divider>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 flexDirection: { xs: "column", sm: "row" },
//                 gap: "5px",
//                 justifyContent: "center",
//               }}
//             >
//               <Typography level="body2">შექმენით ანგარიში</Typography>
//               <Link href="/auth/signup" level="body-md" underline="always">
//                 რეგისტრაცია!
//               </Link>
//             </Box>
//           </Stack>
//         </form>
//       </Box>

//       {/* Right Background */}
//     </Box>
//   );
// }
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

import { useState } from "react";
import EyeIcon from "../components/ui/icons/EyeIcon";
import EyeOffIcon from "../components/ui/icons/EyeOffIcon";
// import AlertMessage from "../components/customToast";
import Spinner from "../components/ui/Spinner";

import { useLogIn } from "../hooks/useLogIn";

export default function Login() {
  const { login, isLoading } = useLogIn();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  console.log(isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    login(data, {
      onSuccess: () => {
        navigate("/home", { replace: true });
      },
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
          marginTop: "48px",
          marginBottom: "64px",
          width: "100%",
          px: 4,
          py: 6,
        }}
      >
        {/* {error && <AlertMessage color="danger" message={error} />} */}

        <Typography level="h3" textAlign="center" marginBottom={1.5}>
          ავტორიზაცია
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack gap={2}>
            {/* Email Input */}
            <FormControl error={!!errors.email}>
              <FormLabel>ელ.ფოსტა</FormLabel>
              <Input
                type="email"
                defaultValue={"beqauri.forwork@gmail.com"}
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

            {/* Password Input */}
            <FormControl error={!!errors.password}>
              <FormLabel>პაროლი</FormLabel>
              <Input
                defaultValue={"Giksona_313131"}
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "პაროლი აუცილებელია",
                  minLength: {
                    value: 6,
                    message: "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო",
                  },
                })}
                endDecorator={
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      cursor: "pointer",
                      height: "24px",
                    }}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </span>
                }
              />
              {errors.password && (
                <FormHelperText>{errors.password.message}</FormHelperText>
              )}

              <Link
                href="/forgot-password"
                level="body-md"
                sx={{
                  marginTop: "10px",
                }}
                justifyContent="flex-end"
                underline="hover"
              >
                პაროლის აღდგენა
              </Link>
            </FormControl>

            {/* Submit Button */}
            <Stack direction="row" justifyContent="flex-end">
              <Button
                fullWidth
                variant="solid"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "ავტორიზაცია"}
              </Button>
            </Stack>

            <Divider>ან</Divider>

            {/* Register Link */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
                gap: "5px",
                justifyContent: "center",
              }}
            >
              <Typography level="body2">შექმენით ანგარიში</Typography>
              <Link href="/auth/signup" level="body-md" underline="always">
                რეგისტრაცია!
              </Link>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
