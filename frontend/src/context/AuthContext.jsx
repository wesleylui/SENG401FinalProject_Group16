import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(""); // Add username state

  const login = (id, username) => {
    setIsAuthenticated(true);
    setIsGuest(false);
    setUserId(id); // Set the userId when logging in
    setUsername(username); // Set the username when logging in
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsGuest(false);
    setUserId(null); // Clear the userId when logging out
    setUsername(""); // Clear the username when logging out
  };

  const guestLogin = () => {
    setIsAuthenticated(true);
    setIsGuest(true);
    setUserId(null); // No userId for guest login
    setUsername(""); // Clear the username for guest login
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isGuest, login, logout, guestLogin, userId, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Add PropTypes validation for children
};

export const useAuth = () => useContext(AuthContext);
