import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { ChatContext } from "../../context/chatContext";
import { UserContext } from "../../context/userContext";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import PhotoDefault from "../../images/defaultPhoto.jpg";
const Container = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  .messageInfo {
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .messageContent {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
      background-color: white;
      padding: 10px 20px;
      border-radius: 0px 10px 10px 10px;
      max-width: auto;
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

const Message = ({ message }) => {
  const { currentUser } = useContext(UserFirebaseContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  const convertSecondosToDate = (seconds) => {
    var d = new Date(seconds * 1000);
    var hora = d.getHours() == 0 ? 23 : d.getHours() - 1;
    var hora = hora < 9 ? "0" + hora : hora;
    var minuto = d.getMinutes() < 9 ? "0" + d.getMinutes() : d.getMinutes();
    var segundo = d.getSeconds() < 9 ? "0" + d.getSeconds() : d.getSeconds();
    var hora = d.getHours() == 0 ? 23 : d.getHours() - 1;
    let val = hora + ":" + minuto + ":" + segundo;
    return val;
  };

  return (
    <Container
      ref={ref}
      className={`${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img src={message.img ? message.img : PhotoDefault} alt="" />
        <span>{convertSecondosToDate(message.date.seconds)}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {/*  <img src={PhotoDefault} alt="" /> */}
      </div>
    </Container>
  );
};

export default Message;
