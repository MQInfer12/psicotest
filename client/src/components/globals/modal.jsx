import React from "react";
import styled from "styled-components";
import { WhiteIconButton } from "../../styles/globals/formularios";

const Modal = ({ cerrar, children, titulo }) => {
  return (
    <DivModalContainer>
      <DivAtras onClick={cerrar}></DivAtras>
      <DivChildContainer>
        <DivCabecera>
          <PTitulo>{titulo}</PTitulo>
          <WhiteIconButton onClick={cerrar}>
            <i className="fa-solid fa-xmark"></i>
          </WhiteIconButton>
        </DivCabecera>
        <DivBody>{children}</DivBody>
      </DivChildContainer>
    </DivModalContainer>
  );
};

export default Modal;

const DivModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
`;

const DivAtras = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);

  animation-name: transitionBackground;
  animation-duration: 1s;
  @keyframes transitionBackground {
    0% {
      background-color: rgba(0, 0, 0, 0.1);
    }
    100% {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
`;

const DivChildContainer = styled.div`
  z-index: 1;
  border-radius: 16px;
  min-width: 400px;
  background-color: white;

  animation: move 1s;
  transform: translateY(50px);
  margin-bottom: 100px;
  @keyframes move {
    0% {
      transform: translateY(0px);
      opacity: 0;
    }
    100% {
      transform: translateY(50px);
      opacity: 1;
    }
  }
`;

const PTitulo = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
`;

const DivCabecera = styled.div`
  width: 100%;
  padding: 10px 26px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DivBody = styled.div`
  padding: 26px;
`;