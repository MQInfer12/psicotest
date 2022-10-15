import React from "react";
import styled from "styled-components";
import Cam from "../../assets/msg/cam.png";
import Add from "../../assets/msg/add.png";
import More from "../../assets/msg/more.png";
import Messages from "./messages";
import Input from './input'
const Container = styled.div`
  flex: 2;
  .chatInfo {
    height: 50px;
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
    }
  }
`;

const Message = () => {
  return (
    <Container>
      <div className="chatInfo">
        <span>JOSE</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </Container>
  );
};

export default Message;
