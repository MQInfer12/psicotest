import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ChatCom from "../components/chat/chatCom";
import Sidebar from "../components/chat/sidebar";
import { useWindowHeight } from "../hooks/useWindowHeight";

const Chat = ({ isInTestView = false, email_docente }) => {
  const { email } = useParams();
  const windowHeight = useWindowHeight(true, true);
  const [showSide, setShowSide] = useState(isInTestView ? false : true);

  return (
    <Home isInTestView={isInTestView} height={isInTestView ? "400px" : windowHeight}>
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

const Home = styled.div`
  width: ${props => props.isInTestView && "80%"};
  box-shadow: ${props => props.isInTestView && "4px 1px 16px -7px rgba(0,0,0,0.6)"};
  height: ${(props) => props.height};
  z-index: 3;
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  position: relative;

  @media (max-width: 950px) {
    width: ${props => props.isInTestView && "100%"};
  }
`;