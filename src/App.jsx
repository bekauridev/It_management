import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Box } from "@mui/joy";

import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import LoaddingPage from "./pages/LoaddingPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import CustomerDashboard from "./pages/CustomerDashboard";
// import { Toaster } from "react-hot-toast";
import CustomToaster from "./components/CustomToaster";
import { Toaster } from "react-hot-toast";
import AlertMessage from "./components/AlertMessage";

// Lazy-loaded components
const Welcome = lazy(() => import("./pages/Welcome"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Home = lazy(() => import("./pages/Home"));
const AdminPannelPage = lazy(() => import("./pages/AdminPannelPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <Box position="relative">
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Header />
        <Suspense fallback={<LoaddingPage />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Welcome />} />
            <Route element={<PublicRoute />}>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
            </Route>

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/adminPanel" element={<AdminPannelPage />} />

              <Route path="/dashboard" element={<CustomerDashboard />} />
            </Route>

            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <Footer />
      {/* <Toaster position="top-right" toastOptions={{ duration: 5000 }} /> */}
      <CustomToaster />
      {/* <Toaster
        toastOptions={{
          style: {
            borderRadius: "4px",
            background: "#171A1C",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          },
          success: {
            style: {
              color: "green",
            },
          },
          error: {
            style: {
              color: "#d61f1f",
            },
          },
        }}
      /> */}
      {/* <AlertMessage message="error " color="danger" /> */}
    </Box>
  );
};

export default App;
