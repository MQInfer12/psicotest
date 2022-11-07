import React, { useState } from "react";
import styled from "styled-components";
import Chat from "../../pages/chat";

const TestViewChat = ({email_docente}) => {
  const [hideChat, setHideChat] = useState(false);
  const handleHideChat = () => {
    setHideChat(!hideChat);
  };
  return (
    <Container>
      {hideChat && <Chat email_docente={email_docente} isInTestView={true} />}
      <button onClick={handleHideChat}>Mostrar Chat</button>
    </Container>
  );
};

export default TestViewChat;

const Container = styled.div`
  width: 400px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
`;
