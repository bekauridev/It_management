import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import LoaddingPage from "../pages/LoaddingPage";
import useAuthContext from "../hooks/useAuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (user === null || user === undefined) {
        navigate("/auth/login", { replace: true });
      }
    },
    [user, navigate]
  );

  if (loading) {
    return <LoaddingPage />; // Show loading spinner until user data is fetched
  }
  return <Outlet />;
};

export default ProtectedRoute;
