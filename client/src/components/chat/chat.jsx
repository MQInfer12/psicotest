import React, { useContext } from "react";
import styled from "styled-components";
import More from "../../assets/msg/more.png";
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../../context/chatContext";
const Container = styled.div`
  width: 100%;
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

const Message = ({ handleClick }) => {
  const { data } = useContext(ChatContext);
  return (
    <Container>
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
