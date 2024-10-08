import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = Cookies.get("adminToken");
    return storedToken || null; // No need to parse since it's stored as a string
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedIn = Cookies.get("isAdminLoggedIn");
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [role, setRole] = useState(() => {
    const storedRole = Cookies.get("adminRole");
    return storedRole || null;
  });

  useEffect(() => {
    if (token && role === "admin") {
      Cookies.set("adminToken", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      }); // Store token directly
      Cookies.set("isAdminLoggedIn", JSON.stringify(true), {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("adminRole", role, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    } else {
      Cookies.remove("adminToken");
      Cookies.remove("isAdminLoggedIn");
      Cookies.remove("adminRole");
      setUserId(null);
      setUserProfile(null);
      setRole(null);
    }
  }, [token, role]);

  const login = (token, role) => {
    if (role === "admin") {
      setToken(token);
      setIsLoggedIn(true);
      setRole(role);
    }
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setRole(null);
    Cookies.remove("adminToken");
    Cookies.remove("isAdminLoggedIn");
    Cookies.remove("adminRole");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, userId, userProfile, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;