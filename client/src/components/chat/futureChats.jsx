import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { UserContext } from "../../context/userContext";
import ProfilePic from "../globals/profilePic";

const Container = styled.div`
  .userChat {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #2f2d52;
    }

    .userChatInfo {
      span {
        font-size: 18px;
        font-weight: 500;
      }
      p {
        font-size: 14px;
        color: lightgray;
      }
    }
  }
`;

const FutureChats = () => {
  const [professor, setProfessor] = useState([]);
  const { user } = useContext(UserContext);
  const { currentUser } = useContext(UserFirebaseContext);
  const [loading, setLoading] = useState(true);

  const getAllProfessor = async () => {
    const q = query(collection(db, "users"), where("rol", "==", "1"));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        professor.push(doc.data());
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProfessor();
  }, []);

  const handleSelect = async (userSelect) => {
    //check wheter the group(chat in firestore) exits
    const combinedId =
      currentUser?.uid > userSelect
        ? currentUser?.uid + userSelect
        : userSelect + currentUser?.uid;
    
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [combinedId + ".userInfo"]: {
            uid: userSelect
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", String(userSelect)), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        alert("se agrego a la opcion de chatear");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {!loading &&
        professor.map((v, i) => (
          <div
            className="userChat"
            key={i}
            onClick={(e) => handleSelect(v.uid)}
          >
            <ProfilePic width="50px" height="50px" id={v.uid} perfil={v.perfil} />
            <div className="userChatInfo">
              <span>{v.email}</span>
            </div>
          </div>
        ))}
    </Container>
  );
};

export default FutureChats;
