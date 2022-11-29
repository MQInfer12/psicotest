import React, { useContext, useEffect } from "react";
//import { useRef } from "react";
import styled from "styled-components";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import { ChatContext } from "../../context/chatContext";
import ProfilePic from "../globals/profilePic";

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
    <Container
      className={`${message.senderId === currentUser.uid && "owner"}`}
    >
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
    </Container>
  );
};

export default Message;

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  .messageInfo {
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;
  }
  
  .messageContent {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;

    p {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: white;
      padding: 10px 20px;
      border-radius: 0px 10px 10px 10px;
    }

    img {
      width: 50%;
    }
  }

  &.owner {
    flex-direction: row-reverse;

    .messageContent {
      align-items: flex-end;

      p {
        background-color: #8da4f1;
        color: white;
        border-radius: 10px 0px 10px 10px;
      }
    }
  }
`;
