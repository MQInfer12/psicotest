import React from "react";
import { useModal } from "../../hooks/useModal";
import { ButtonChat } from "../../styles/pages/testView";
import ModalChat from "./modalChat";

const TestViewChat = ({ email_docente }) => {
  const { openModal } = useModal(
    "Resuelve dudas",
    <ModalChat email_docente={email_docente} />
  )

  return (
    <ButtonChat onClick={openModal}>
      <i className="fa-solid fa-comment"></i>
    </ButtonChat>
  );
};

export default TestViewChat;