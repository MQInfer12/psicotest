import React, { useContext, useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import styled from "styled-components";
import { db } from "../../firebase";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import ProfilePic from "../globals/profilePic";
import { getMisDocentes } from "../../services/respuesta";

const FutureChats = () => {
  const [professor] = useState([]);
  const { user } = useUserContext();
  const { currentUser } = useContext(UserFirebaseContext);
  const [loading, setLoading] = useState(true);

  const getMyProfessors = async () => {
    const res = await getMisDocentes(user.email);
    const resJson = await res?.json();
    const misDocentesIds = [];
    resJson.forEach(docente => {
      misDocentesIds.push(docente.id);
    });
    const q = query(collection(db, "users"), where("uid", "in", misDocentesIds));
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
    getMyProfessors();
  }, []);

  const handleSelect = async (userSelect) => {
    //check wheter the group(chat in firestore) exits
    const combinedId =
      Number(currentUser?.uid) > Number(userSelect)
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
            <ProfilePic width="50px" height="50px" perfil={v.perfil} />
            <div className="userChatInfo">
              <span>{v.email}</span>
            </div>
          </div>
        ))}
    </Container>
  );
};

export default FutureChats;

const Container = styled.div`
  .userChat {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    cursor: pointer;
    &>div:first-child{
      min-width: 50px;
    }
    &:hover {
      background-color: #2f2d52;
    }

    .userChatInfo {
      span {
        font-size: 18px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }
      p {
        font-size: 14px;
        color: lightgray;
      }
    }
  }
`;