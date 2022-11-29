import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../../context/chatContext";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import { db } from "../../firebase";
import Cargando from "../globals/cargando";
import ProfilePic from "../globals/profilePic";

const Chats = ({ handleClick, email: emailURL }) => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(UserFirebaseContext);
  const { dispatch } = useContext(ChatContext);
  const [loading, setLoading] = useState(true);

  const getUserByChat = async (data) => {
    let chatsData = [];
    for (let key in data) {
      const userChat = data[key];
      const userInfo = userChat.userInfo;
      const uid = userInfo.uid;

      const q = query(collection(db, "users"), where("uid", "==", Number(uid)));
      try {
        const querySnapshot = await getDocs(q);
        const { email, perfil } = querySnapshot.docs[0].data();
        userChat.userInfo.email = email;
        userChat.userInfo.perfil = perfil;
        chatsData.push(userChat);
      } catch (err) {
        console.log(err);
      }
    }
    return chatsData;
  };

  useEffect(() => {
    const getChats = async () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser?.uid),
        async (doc) => {
          const data = doc.data();
          const chatsData = await getUserByChat(data);
          chatsData.sort((a, b) => b.date - a.date);
          setChats(chatsData);
          setLoading(false);
        }
      );
      
      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  useEffect(() => {
    if(emailURL) {
      chats.forEach(chat => {
        if(chat.userInfo.email == emailURL) {
          handleShowChat(chat);
        }
      });
    }
  }, [chats, emailURL]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleShowChat = async (v) => {
    handleSelect(v.userInfo);

    let newArray = [];
    const docSnap = await getDoc(doc(db, "notifications", String(currentUser?.uid)));
    docSnap.data().notification.forEach(doc => {
      if(doc.uidSender != v.userInfo.uid) {
        newArray.push(doc);
      }
    });
    await updateDoc(doc(db, "notifications", String(currentUser?.uid)), {
      notification: newArray,
    });

    if(window.innerWidth <= 1080) {
      handleClick();
    }
  }

  return (
    <Container>
      {
        loading ? (
          <Cargando container text={false} />
        ) : (
          chats &&
            chats.map((v, i) => (
              <div
                className="userChat"
                key={i}
                onClick={() => {
                  handleShowChat(v);
                }}
              >
                <ProfilePic
                  width="50px"
                  height="50px"
                  perfil={v.userInfo.perfil}
                  className="img"
                />
                <div className="userChatInfo">
                  <span>{v.userInfo.email}</span>
                  <p>{v.lastMessage != undefined && v.lastMessage.text}</p>
                </div>
              </div>
            ))
        )
      }
    </Container>
  );
};

export default Chats;

const Container = styled.div`
  height: calc(100% - 50px);
  .userChat {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    cursor: pointer;
    width: 100%;

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
      }
      p {
        font-size: 14px;
        color: lightgray;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
