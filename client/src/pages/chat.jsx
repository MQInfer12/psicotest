import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ChatCom from "../components/chat/chatCom";
import Sidebar from "../components/chat/sidebar";
import { useWindowHeight } from "../hooks/useWindowHeight";

const Home = styled.div`
  height: ${(props) => props.height};
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

const Chat = ({ isInTestView = false, email_docente }) => {
  const { email } = useParams();
  const windowHeight = useWindowHeight(true, true);
  const [showSide, setShowSide] = useState(isInTestView ? false : true);

  return (
    <Home height={isInTestView ? "500px" : windowHeight}>
      <Sidebar
        email={email_docente ? email_docente : email}
        showSide={showSide}
        handleClick={() => setShowSide(false)}
      />
      <ChatCom
        isInTestView={isInTestView}
        showSide={showSide}
        handleClick={() => setShowSide(!showSide)}
      />
    </Home>
  );
};

export default Chat;
