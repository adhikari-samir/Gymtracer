// UserProvider.js
import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get("http://127.0.0.1:9000/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response?.status === 200) {
        console.log(response?.data);
        setUserData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const contextValue = {
    userData,
    loading,
    fetchUserData, // Now fetchUserData can be invoked elsewhere
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
