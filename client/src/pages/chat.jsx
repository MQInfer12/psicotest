import React, { useState } from "react";
import styled from "styled-components";
import ChatCom from "../components/chat/chatCom";
import Sidebar from "../components/chat/sidebar";
import { useWindowHeight } from "../hooks/useWindowHeight";

const Home = styled.div`
  height: ${props => props.height};
  z-index: 3;
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
  const windowHeight = useWindowHeight(true, true);
  const [showSide, setShowSide] = useState(true);

  return (
    <Home height={windowHeight}>
      <Sidebar showSide={showSide} handleClick={() => setShowSide(false)} />
      <ChatCom showSide={showSide} handleClick={() => setShowSide(!showSide)} />
    </Home>
  );
};

export default Chat;
