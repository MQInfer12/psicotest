import React, { createContext, useMemo, useState } from "react";

export const ThanksContext = createContext(null);

export const ThanksContextProvider = ({ children }) => {
  const [activateThanks, setActivateThanks] = useState(false);
  const value = useMemo(() => ({ activateThanks, setActivateThanks }), [activateThanks, setActivateThanks]);
  return (
    <ThanksContext.Provider value={value}>
      { children }
    </ThanksContext.Provider>
  )
}