import React, { useState, createContext, useMemo } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  )
}