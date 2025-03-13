import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    setIsGuest(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsGuest(false);
  };

  const guestLogin = () => {
    setIsAuthenticated(true);
    setIsGuest(true);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isGuest, login, logout, guestLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
