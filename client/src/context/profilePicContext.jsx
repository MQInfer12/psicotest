import React, { createContext, useState, useMemo, useEffect } from "react";

export const ProfilePicContext = createContext();

export const ProfilePicContextProvider = ({ children }) => {
  const [profilePics, setProfilePics] = useState({});
  const value = useMemo(() => ({ profilePics, setProfilePics }), [profilePics, setProfilePics]);

  useEffect(() => {
    console.log(profilePics);
  }, [profilePics])

  return (
    <ProfilePicContext.Provider value={value}>
      { children }
    </ProfilePicContext.Provider>
  )
}