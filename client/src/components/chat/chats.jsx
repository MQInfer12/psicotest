import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../../context/chatContext";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import { db } from "../../firebase";
import DefaultPhoto from "../../images/defaultPhoto.jpg";

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

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
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

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <Container>
      {Object.entries(chats)
        .sort((a, b) => b[1].date - a[1].date)
        .map((v, i) => (
          <div
            className="userChat"
            key={i}
            onClick={() => handleSelect(v[1].userInfo)}
          >
            <img src={DefaultPhoto} alt="" />
            <div className="userChatInfo">
              <span>{v[1].userInfo.email}</span>
              <p>{v[1].lastMessage !=undefined && v[1].lastMessage.text }</p>
            </div>
          </div>
        ))}
    </Container>
  );
};

export default Chats;
