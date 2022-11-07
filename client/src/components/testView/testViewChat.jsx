import React from "react";
import styled from "styled-components";
import Chat from "../../pages/chat";

const TestViewChat = ({email_docente}) => {
  return (
    <Container>
      <TestInfoTitle>¿Tienes dudas?</TestInfoTitle>
      <FeatureDescription>¡Consulta a tu docente aquí!</FeatureDescription>
      <Chat email_docente={email_docente} isInTestView={true} />
    </Container>
  );
};

export default TestViewChat;

const Container = styled.div`
  width: 100%;
  padding: 0 40px 40px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 500px) {
    padding: 0px 20px 40px;
  }
`;

const TestInfoTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #660BE1;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
`;