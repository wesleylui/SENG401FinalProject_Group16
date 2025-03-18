import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setIsAuthenticated(true);
      setUserId(storedUser.userId);
      setUsername(storedUser.username);
    }
  }, []);

  const login = (id, username) => {
    setIsAuthenticated(true);
    setIsGuest(false);
    setUserId(id);
    setUsername(username);
    localStorage.setItem("user", JSON.stringify({ userId: id, username }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsGuest(false);
    setUserId(null);
    setUsername("");
    // Clear user data from localStorage
    localStorage.removeItem("user");
  };

  const guestLogin = () => {
    setIsAuthenticated(true);
    setIsGuest(true);
    setUserId(null);
    setUsername("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isGuest,
        login,
        logout,
        guestLogin,
        userId,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
