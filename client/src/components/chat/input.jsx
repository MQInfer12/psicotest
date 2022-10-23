import React, { useContext, useState } from "react";
import styled from "styled-components";
import Img from "../../assets/msg/img.png";
import Attach from "../../assets/msg/attach.png";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import { ChatContext } from "../../context/chatContext";
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import { UserContext } from "../../context/userContext";

const InputComp = styled.div`
  height: 50px;
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 100%;
    border: none;
    outline: none;
    color: #2f2d52;
    font-size: 18px;

    &::placeholder {
      color: lightgray;
    }
  }
  .send {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      height: 24px;
      cursor: pointer;
    }

    button {
      border: none;
      padding: 10px 15px;
      color: white;
      background-color: #8da4f1;
      cursor: pointer;
    }
  }
`;

const Input = () => {
  const [text, setText] = useState("");
  const { user } = useContext(UserContext);
  const { currentUser } = useContext(UserFirebaseContext);

  const { data } = useContext(ChatContext);
  
  const handleSend = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser?.uid,
        date: Timestamp.now(),
        email: user.email,
        perfil: user.perfil
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser?.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", String(data.user.uid)), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
  };

  return (
    <InputComp>
      <input
        type="text"
        placeholder="Escribe algo"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Enviar</button>
      </div>
    </InputComp>
  );
};

export default Input;
