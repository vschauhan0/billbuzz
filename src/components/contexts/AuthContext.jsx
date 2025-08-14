
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");
    if (token && email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogin = (email, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userEmail", email);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ userEmail, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);