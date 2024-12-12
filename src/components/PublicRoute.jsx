import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import LoaddingPage from "../pages/LoaddingPage";
import useAuthContext from "../hooks/useAuthContext";

const PublicRoute = () => {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (user && user.role === "admin") {
        navigate("/adminPanel", { replace: true });
      } else if (user && user.role === "user") {
        navigate("/services", { replace: true });
      }
    },
    [user, navigate]
  );

  if (loading) {
    return <LoaddingPage />;
  }

  return <Outlet />;
};

export default PublicRoute;
