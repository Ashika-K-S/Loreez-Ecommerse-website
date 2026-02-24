import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage and verify session
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");

      if (storedUser && accessToken) {
        try {
          setUser(JSON.parse(storedUser));
          // Ensure the default header is set for initial requests
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          // Optionally verify token with a "Me" endpoint
        } catch (err) {
          console.error("Auth initialization error:", err);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Set default header immediately on login
    const token = localStorage.getItem("accessToken");
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Clear the Authorization header from the api instance
    if (api.defaults.headers.common["Authorization"]) {
        delete api.defaults.headers.common["Authorization"];
    }
  };

  const updateUser = (updatedData) => {
    if (!user) return;
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
