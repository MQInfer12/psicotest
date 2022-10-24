import React, { useState, createContext, useMemo, useEffect } from "react";
import { getProfile } from "../services/auth";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const getUser = async () => {
    const userPromise = await getProfile();
    setUser(userPromise);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  )
}