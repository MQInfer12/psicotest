import React, { createContext, useContext, useMemo, useState } from "react";
import { useEffect } from "react";

export const GetContext = createContext(null);

export const useGetContext = () => {
  const context = useContext(GetContext);
  if (!context) {
    throw new Error(
      "this contexts must be used whitin a GetContextProvider"
    );
  }
  return context;
};

export const GetContextProvider = ({ children }) => {
  const [gets, setGets] = useState({});
  const value = useMemo(() => ({ gets, setGets }), [gets, setGets]);

  useEffect(() => {
    console.log(gets);
  }, [gets])

  return (
    <GetContext.Provider value={value}>
      { children }
    </GetContext.Provider>
  )
}