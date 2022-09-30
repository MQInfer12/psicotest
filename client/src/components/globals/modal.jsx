import React from "react";
import styled from "styled-components";

const DivModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 5;
`;

const ButtonClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 32px;
  width: 32px;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 16px;
  background: linear-gradient(to right, #ff512f, #dd2476);
  box-shadow: 0px 0px 50px 0px rgb(0 0 0 / 10%);
  color: #f8f9fa;

  &:hover {
    background: linear-gradient(to right, #8e2de2, #4a00e0);
  }
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
  position: relative;
  z-index: 1;
  border-radius: 16px;
  width: 400px;
  background-color: white;
  padding: 40px;
`;

const Modal = ({cerrar, children}) => {
  return (
    <DivModalContainer>
      <DivAtras onClick={cerrar}></DivAtras>
      <DivChildContainer>
        { children }
        <ButtonClose onClick={cerrar}>x</ButtonClose>
      </DivChildContainer>
    </DivModalContainer>
  )
}

export default Modal;