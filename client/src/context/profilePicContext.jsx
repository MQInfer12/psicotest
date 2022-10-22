import React, { createContext, useState, useMemo } from "react";

export const ProfilePicContext = createContext();

export const ProfilePicContextProvider = ({ children }) => {
  const [profilePics, setProfilePics] = useState({});
  const value = useMemo(() => ({ profilePics, setProfilePics }), [profilePics, setProfilePics]);

  return (
    <ProfilePicContext.Provider value={value}>
      { children }
    </ProfilePicContext.Provider>
  )
}