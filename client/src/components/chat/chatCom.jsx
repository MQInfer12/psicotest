import React, { useContext } from "react";
import styled from "styled-components";
import Cam from "../../assets/msg/cam.png";
import Add from "../../assets/msg/add.png";
import More from "../../assets/msg/more.png";
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../../context/chatContext";

const Container = styled.div`
  width: ${props => props.showSide ? "calc(100% - 350px)" : "100%"};
<<<<<<< HEAD:client/src/components/chat/chat.jsx
  
  .chatInfo { 
=======
   
  .chatInfo {
>>>>>>> 1edf7ebd621a3d16d69d791c8342a12c52a4eeb2:client/src/components/chat/chatCom.jsx
    background-color: #5d5b8d;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: lightgray;
  }

  .chatIcons {
    display: flex;
    gap: 10px;

    img {
      height: 24px;
      cursor: pointer;
      z-index: 2;
    }
  }

  @media (max-width: 1080px) {
    width: 100%;
  }
`;

<<<<<<< HEAD:client/src/components/chat/chat.jsx
const Message = ({ showSide, handleClick }) => {
=======
const ChatCom = ({ showSide, handleClick }) => {
>>>>>>> 1edf7ebd621a3d16d69d791c8342a12c52a4eeb2:client/src/components/chat/chatCom.jsx
  const { data } = useContext(ChatContext);
  return (
    <Container showSide={showSide}>
      <div className="chatInfo">
        <span>{data.user.email}</span>
        <div className="chatIcons">
 {/*          <img src={Cam} alt="" />
          <img src={Add} alt="" /> */}
          <img src={More} onClick={handleClick} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </Container>
  );
};

export default ChatCom;