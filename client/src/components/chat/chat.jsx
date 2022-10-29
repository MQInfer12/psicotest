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
  
  .chatInfo { 
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

const Message = ({ showSide, handleClick }) => {
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

export default Message;