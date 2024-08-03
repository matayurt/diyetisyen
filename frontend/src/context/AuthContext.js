// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const login = (userData) => {
  //   setUser(userData);
  // };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      } else {
        try {
          const { data } = await axios.get(
            "http://localhost:5001/api/users/user"
          );
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
