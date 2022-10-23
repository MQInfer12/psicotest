import { async } from "@firebase/util";
import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../../context/chatContext";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import { db } from "../../firebase";
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

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(UserFirebaseContext);
  const { dispatch } = useContext(ChatContext);
  let userData = {};
  let chatsData = [];

  const getUserInfo = async (userChat) => {
    const userInfo = userChat.userInfo;
    const uid = userInfo.uid;

    const q = query(collection(db, "users"), where("uid", "==", Number(uid)));
    try {
      const querySnapshot = await getDocs(q);
      userData = querySnapshot.docs[0].data();
      console.log(userData);

      const { email, perfil } = userData;

      userChat.userInfo.email = email;
      userChat.userInfo.perfil = perfil;

      chatsData.push(userChat);
      console.log(chatsData)
    } catch (err) {
      console.log(err);
    }
  }

  const assignUserToChat = async (userChat) => {
    await getUserInfo(userChat);
    /* console.log(userData);
    const { email, perfil } = userData;
    userChat.userInfo.email = email;
    userChat.userInfo.perfil = perfil;
    chatsData.push(userChat);
    setChats(chatsData); */
  }

  useEffect(() => {
    const getChats = async () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser?.uid), (doc) => {
        const data = doc.data();
        for(let key in data) {
          getUserInfo(data[key]);
        }
        setChats(chatsData);
      });
      return () => {
        unsub();
      };
    };
    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <Container>
      {chats &&
        Object.entries(chats)
        .sort((a, b) => b[1].date - a[1].date)
        .map((v, i) => { console.log(v[1].userInfo); return (
          <div
            className="userChat"
            key={i}
            onClick={() => handleSelect(v[1].userInfo)}
          >
            <ProfilePic
              width="50px"
              height="50px"
              id={v[1].userInfo.uid}
              perfil={v[1].userInfo.perfil}
            />
            <div className="userChatInfo">
              <span>{v[1].userInfo.email}</span>
              <p>{v[1].lastMessage != undefined && v[1].lastMessage.text}</p> 
            </div>
          </div>
        )})
      }
    </Container>
  );
};

export default Chats;
