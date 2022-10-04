import React from "react";
import styled from "styled-components";
import { WhiteIconButton } from "../../styles/formularios";

const DivModalContainer = styled.div`
  width: 100%;
  height: 100vh;
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
`;

const DivChildContainer = styled.div`
  z-index: 1;
  border-radius: 16px;
  min-width: 400px;
  background-color: white;
`;

const PTitulo = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
`;

const DivCabecera = styled.div`
  width: 100%;
  padding: 10px 26px;
  border-bottom: 1px solid #D9D9D9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DivBody = styled.div`
  padding: 26px;
`;

const Modal = ({cerrar, children, titulo}) => {
  return (
    <DivModalContainer>
      <DivAtras onClick={cerrar}></DivAtras>
      <DivChildContainer>
      <DivCabecera>
        <PTitulo>{titulo}</PTitulo>
        <WhiteIconButton onClick={cerrar}><i className="fa-solid fa-xmark"></i></WhiteIconButton>
      </DivCabecera>
        <DivBody>
          { children }
        </DivBody>
      </DivChildContainer>
    </DivModalContainer>
  )
}

export default Modal;