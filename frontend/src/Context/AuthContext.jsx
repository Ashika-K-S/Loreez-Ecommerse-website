import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const getTokensFromUser = (userData) => {
  if (!userData || typeof userData !== "object") {
    return { accessToken: null, refreshToken: null };
  }

  return {
    accessToken: userData.access || userData.accessToken || null,
    refreshToken: userData.refresh || userData.refreshToken || null,
  };
};

const clearAuthStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
        clearAuthStorage();
      }
    }
  }, []);

  const login = (userData) => {
    if (!userData) {
      setUser(null);
      clearAuthStorage();
      return;
    }

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    const { accessToken, refreshToken } = getTokensFromUser(userData);

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  };

  const logout = () => {
    setUser(null);
    clearAuthStorage();
  };

  const updateUser = (updatedData) => {
    if (!user) return;

    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
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