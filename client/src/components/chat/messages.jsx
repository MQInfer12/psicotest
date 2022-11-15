import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../../context/chatContext";
import Message from "./message";
import { db } from "../../firebase";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import Cargando from "../globals/cargando";
import { useRef } from "react";

const Messages = () => {
  const MessageContainerRef = useRef(null);
  const [messagesEstate, setMessagesEstate] = useState([]);
  const { data } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if(data.chatId != null) {
      setLoading(true);
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        const msgs = doc.data().messages;
        doc.exists() && setMessagesEstate(
          msgs.filter((v, i) => i >= msgs.length - 10 && i < msgs.length)
        );
        setLoading(false);
      });
      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  useEffect(() => {
    MessageContainerRef.current.scrollTo(0, MessageContainerRef.current.scrollHeight);
  }, [messagesEstate]);

  return (
    <Container ref={MessageContainerRef}>
      {
        loading ? (
          <Cargando container />
        ) : (
          <div className="messages">
            {messagesEstate.map((v, i) => (
              <Message message={v} key={i} />
            ))}
          </div>
        )
      }
    </Container>
  );
};

export default Messages;

const Container = styled.div`
  background-color: #ddddf7;
  padding: 10px;
  height: calc(100% - 95px);
  overflow-y: scroll;
`;