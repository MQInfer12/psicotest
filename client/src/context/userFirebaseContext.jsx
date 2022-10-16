import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
export const UserFirebaseContext = createContext();

export const UserFirebaseContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <UserFirebaseContext.Provider value={{ currentUser }}>
      {children}
    </UserFirebaseContext.Provider>
  );
};
