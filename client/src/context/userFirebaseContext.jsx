import { createContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
export const UserFirebaseContext = createContext();

export const UserFirebaseContextProvider = ({ children }) => {
  const { user } = useUserContext();
  const [currentUser, setCurrentUser] = useState({});
  const newUser = [];

  const getUser = async () => {
    const q = query(collection(db, "users"), where("uid", "==", user?.id));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newUser.push(doc.data());
      });
      const newUserObj = Object.assign({}, newUser[0]);
      newUserObj.uid = String(newUserObj.uid);
      setCurrentUser(newUserObj);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(user?.id) {
      getUser();
    }
  }, [user?.id]);

  return (
    <UserFirebaseContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserFirebaseContext.Provider>
  );
};
