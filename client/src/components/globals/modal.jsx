import React from "react";
import { useModalContext } from "../../context/modalContext";
import { DivAtras, DivBody, DivCabecera, DivChildContainer, DivModalContainer, PTitulo } from "../../styles/global-components/modal";
import { WhiteIconButton } from "../../styles/globals/formularios";

const Modal = () => {
  const { openModal, setOpenModal, titulo, contenido } = useModalContext();

  if(openModal) return (
    <DivModalContainer>
      <DivAtras onClick={() => setOpenModal(false)}></DivAtras>
      <DivChildContainer>
        <DivCabecera>
          <PTitulo>{titulo}</PTitulo>
          <WhiteIconButton onClick={() => setOpenModal(false)}>
            <i className="fa-solid fa-xmark"></i>
          </WhiteIconButton>
        </DivCabecera>
        <DivBody>{contenido}</DivBody>
      </DivChildContainer>
    </DivModalContainer>
  );
};

export default Modal;