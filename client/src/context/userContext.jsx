import React, { useState, createContext, useMemo, useEffect, useContext } from "react";
import { getProfile } from "../services/auth";

export const UserContext = createContext(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "this contexts must be used whitin a UserContextProvider"
    );
  }
  return context;
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const getUser = async () => {
    const userPromise = await getProfile();
    const resJson = await userPromise?.json();
    if(resJson?.message == "you can't send the token empty") {
      setUser({ isLogged: false });
    } else {
      setUser({...resJson, isLogged: true});
    }
  }

  useEffect(() => {
    if(Object.keys(user).length === 0) {
      getUser();
    }
  });

  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  )
}