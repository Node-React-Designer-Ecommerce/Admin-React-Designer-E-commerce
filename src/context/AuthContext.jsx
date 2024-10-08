import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminToken, setadminToken] = useState(() => {
    const storedadminToken = Cookies.get("adminadminToken");
    return storedadminToken || null; // No need to parse since it's stored as a string
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
    if (adminToken && role === "admin") {
      Cookies.set("adminadminToken", adminToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      }); // Store adminToken directly
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
      Cookies.remove("adminadminToken");
      Cookies.remove("isAdminLoggedIn");
      Cookies.remove("adminRole");
      setUserId(null);
      setUserProfile(null);
      setRole(null);
    }
  }, [adminToken, role]);

  const login = (adminToken, role) => {
    if (role === "admin") {
      setadminToken(adminToken);
      setIsLoggedIn(true);
      setRole(role);
    }
  };

  const logout = () => {
    setadminToken(null);
    setIsLoggedIn(false);
    setRole(null);
    Cookies.remove("adminadminToken");
    Cookies.remove("isAdminLoggedIn");
    Cookies.remove("adminRole");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ adminToken, isLoggedIn, userId, userProfile, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;