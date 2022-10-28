import React, { useState } from "react";
import styled from "styled-components";
import ChatCom from "../components/chat/chat";
import Sidebar from "../components/chat/sidebar";

const Home = styled.div`
  height: calc(100vh - 197px);
  z-index: 1;
  border: 1px solid white;
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Chat = () => {
  const [showSide, setShowSide] = useState(true);

  return (
    <Home>
      <Sidebar showSide={showSide} handleClick={() => setShowSide(false)} />
      <ChatCom handleClick={() => setShowSide(!showSide)} />
    </Home>
  );
};

export default Chat;
