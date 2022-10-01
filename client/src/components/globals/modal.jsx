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
  top: 10px;
  right: 10px;
  font-size: 16px;
  color: #D9D9D9;
  text-align: center;
  background-color: #660BE1;
  height: 32px;
  width: 32px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
  min-width: 400px;
  background-color: white;
  padding: 26px;
`;

const Modal = ({cerrar, children}) => {
  return (
    <DivModalContainer>
      <DivAtras onClick={cerrar}></DivAtras>
      <DivChildContainer>
        { children }
        <ButtonClose onClick={cerrar}><i className="fa-solid fa-xmark"></i></ButtonClose>
      </DivChildContainer>
    </DivModalContainer>
  )
}

export default Modal;