import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../../context/chatContext";
import Message from "./message";
import { db } from "../../firebase";
import { onSnapshot } from "firebase/firestore";
import {
  doc
} from "firebase/firestore";
const Container = styled.div`
  background-color: #ddddf7;
  padding: 10px;
  height: calc(100% - 100px);
  overflow-y: scroll;
`;

const Messages = () => {
  const [messagesEstate, setMessagesEstate] = useState([]);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessagesEstate(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <Container>
      <div className="messages">
        {messagesEstate.map((v, i) => (
          <Message message={v} key={i} />
        ))}

      </div>
    </Container>
  );
};

export default Messages;
