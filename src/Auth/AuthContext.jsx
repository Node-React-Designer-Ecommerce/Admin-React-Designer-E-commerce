import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    return token && role ? { token , role } : null;
  });


  const login = (token, role) => {
    setUser({ token, role });
    Cookies.set("token", token, { expires: 7 }); 
    Cookies.set("role", role, { expires: 7 }); 
  };

  
  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("role");
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
