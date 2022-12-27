import React, { useContext } from "react";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import { ChatContext } from "../../context/chatContext";
import ProfilePic from "../globals/profilePic";
import { MessageContainer } from "../../styles/pages/chat";

const Message = ({ message }) => {
  const { currentUser } = useContext(UserFirebaseContext);
  const { data } = useContext(ChatContext);
  const otherUser = data.user;

  const convertSecondosToDate = (seconds) => {
    var d = new Date(seconds * 1000);
    var hora = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var minuto = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    var segundo = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    let val = hora + ":" + minuto + ":" + segundo;
    return val;
  };

  return (
    <MessageContainer className={`${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <ProfilePic
          width="40px"
          height="40px"
          perfil={
            message.senderId == currentUser.uid
              ? currentUser.perfil
              : otherUser.perfil
          }
        />
        <span>{convertSecondosToDate(message.date.seconds)}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
      </div>
    </MessageContainer>
  );
};

export default Message;