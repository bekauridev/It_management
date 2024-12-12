import { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/config";
import { fetchRequest } from "../utils/fetchRequest";
import { Navigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// ! (TO DO ) Lang translate with i18next
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      try {
        const data = await fetchRequest("users/getMe", "GET");
        setUser(data.data.user); // Set the authenticated user
      } catch (err) {
        setUser(null); // Clear user on error
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true); // Set loading for the login operation
    try {
      const data = await fetchRequest(`auth/login`, "POST", {
        email,
        password,
      });
      setUser(data.data.user);
    } catch (error) {
      setError(error.message); // Set error message
      setUser(null);
    } finally {
      setLoading(false); // Reset loading
    }
  };

  const signup = async (name, email, password, passwordConfirm) => {
    setLoading(true); // Set loading for the sign-up operation

    try {
      const data = await fetchRequest(`auth/signup`, "POST", {
        name,
        email,
        password,
        passwordConfirm,
      });
      setUser(data.data.user);
    } catch (error) {
      setError(error.message); // Set error message
      setUser(null);
    } finally {
      setLoading(false); // Reset loading
    }
  };
  const clearError = () => setError("");
  return (
    <AuthContext.Provider
      value={{ user, setUser, login, signup, loading, error, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
