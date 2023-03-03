import React, { useContext, useState } from "react";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import { ChatContext } from "../../context/chatContext";
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import { InputComp } from "../../styles/pages/chat";

const Input = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(UserFirebaseContext);
  const { data } = useContext(ChatContext);
  
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleSend(e);
    }
  }

  const handleSend = async () => {
    if(!text.trim()) return;
    setText("");

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser?.uid,
        date: Timestamp.now(),
      }),
    });

    //VISUALIZAR ULTIMO MENSAJE
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

    //LLENAR NOTIFICACIONES
    let flag = false;
    let newArray = [];
    const docSnap = await getDoc(doc(db, "notifications", String(data.user.uid)));
    docSnap.data().notification.forEach(doc => {
      if(doc.uidSender == currentUser?.uid) {
        doc.cant = doc.cant + 1;
        doc.date = Timestamp.now();
        newArray.push(doc)
        flag = true;
      } else {
        newArray.push(doc);
      }
    });
    if(!flag) {
      newArray.push({
        uidSender: Number(currentUser?.uid),
        date: Timestamp.now(),
        cant: 1,
        email: currentUser?.email
      })
    }
    await updateDoc(doc(db, "notifications", String(data.user.uid)), {
      notification: newArray,
    });
  };

  return (
    <InputComp>
      <input
        type="text"
        placeholder="Escribe algo"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyPress={handleKeyPress}
      />
      <div className="send">
        <button onClick={handleSend}>Enviar</button>
      </div>
    </InputComp>
  );
};

export default Input;