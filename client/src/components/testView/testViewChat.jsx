import React from "react";
import Chat from "../../pages/chat";
import { FeatureDescription, TestInfoTitle, TestViewChatContainer } from "../../styles/pages/testView";

const TestViewChat = ({email_docente}) => {
  return (
    <TestViewChatContainer>
      <TestInfoTitle>¿Tienes dudas?</TestInfoTitle>
      <FeatureDescription>¡Consulta a tu docente aquí!</FeatureDescription>
      <Chat email_docente={email_docente} isInTestView={true} />
    </TestViewChatContainer>
  );
};

export default TestViewChat;