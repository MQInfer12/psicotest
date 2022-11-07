import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../../context/chatContext";
import Message from "./message";
import { db } from "../../firebase";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import Cargando from "../globals/cargando";

const Messages = () => {
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

  return (
    <Container>
      {
        loading ? (
          <CargandoContainer>
            <Cargando />
          </CargandoContainer>
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

const CargandoContainer = styled.div`
  height: 100%;
`;

const Container = styled.div`
  background-color: #ddddf7;
  padding: 10px;
  height: calc(100% - 100px);
  overflow-y: scroll;
`;