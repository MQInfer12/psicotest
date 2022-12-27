import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/chatContext";
import Message from "./message";
import { db } from "../../firebase";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import Cargando from "../globals/cargando";
import { useRef } from "react";
import { MessagesContainer } from "../../styles/pages/chat";

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
    <MessagesContainer ref={MessageContainerRef}>
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
    </MessagesContainer>
  );
};

export default Messages;