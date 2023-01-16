import styled from "styled-components";
import { theme } from "../globals/themes";

export const DivModalContainer = styled.div`
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

export const DivAtras = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(62, 67, 93, 0.4);

  animation-name: transitionBackground;
  animation-duration: 1s;
  @keyframes transitionBackground {
    0% {
      background-color: rgba(62, 67, 93, 0.1);
    }
    100% {
      background-color: rgba(62, 67, 93, 0.4);
    }
  }
`;

export const DivChildContainer = styled.div`
  z-index: 1;
  border-radius: 16px;
  min-width: 400px;
  background-color: #FFFFFF;

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

export const PTitulo = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: rgba(62, 67, 93, 0.5);
`;

export const DivCabecera = styled.div`
  width: 100%;
  padding: 10px 26px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DivBody = styled.div`
  padding: 26px;
`;