import React from 'react';
import styled from 'styled-components';

const RadioButton = ({ setResultados, pregunta, reactivo }) => {
  const handleChange = (target) => {
    const { name, value } = target;

    setResultados(res => ({
      ...res,
      [name]: value,
    }));
    target.checked = true;
  };
  
  return (
    <ReactivoContainer onClick={(e) => handleChange(e.target.children[0].children[0])}>
      <CheckContainer className="cbx">
        <Checkbox 
          type="radio"
          name={pregunta.id} 
          value={
            pregunta.puntuaciones
            .filter(
              (puntuacion) =>
                puntuacion.id_reactivo == reactivo.id
            )
            .map((puntuacion) => puntuacion.id)
          }
        />
        <label></label>
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
          <path d="M2 8.36364L6.23077 12L13 2"></path>
        </svg>
      </CheckContainer>
      {reactivo.descripcion}
    </ReactivoContainer>
  )
}

export default RadioButton;

const ReactivoContainer = styled.div`
  min-height: 62px;
  width: 100%;
  padding: 0px 40px;
  display: flex;
  align-items: center;
  gap: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  user-select: none;
  cursor: pointer;
  background-color: #6209db;
  transition: all 0.2s;

  &:hover {
    background-color: #5a08cc;
  }

  @media (max-width: 1260px) {
    font-size: 16px;
  }
`;

const CheckContainer = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  top: 0;
  left: 0;
  pointer-events: none;

  & label {
    width: 36px;
    height: 36px;
    background: none;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-filter: url("#goo");
    filter: url("#goo");
    transform: trasnlate3d(0, 0, 0);
    pointer-events: none;
  }

  & svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    pointer-events: none;
  }

  & svg path {
    stroke: #fff;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 19;
    stroke-dashoffset: 19;
    transition: stroke-dashoffset 0.3s ease;
    transition-delay: 0.2s;
  }
`;

const Checkbox = styled.input`
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border: 2px solid #bfbfc0;
  border-radius: 50%;

  &:focus {
    outline: 0;
  }

  &:checked + label {
    animation: splash 0.6s ease forwards;
  }

  &:checked + label + svg path {
    stroke-dashoffset: 0;
  }

  @keyframes splash {
    40% {
      box-shadow: 
        0 -18px 0 -8px rgb(134, 110, 251, 0.7), 
        16px -8px 0 -8px rgb(134, 110, 251, 0.7), 
        16px 8px 0 -8px rgb(134, 110, 251, 0.7), 
        0 18px 0 -8px rgb(134, 110, 251, 0.7), 
        -16px 8px 0 -8px rgb(134, 110, 251, 0.7), 
        -16px -8px 0 -8px rgb(134, 110, 251, 0.7);
    }
    100% {
      background: #866efb;
      box-shadow: 
        0 -36px 0 -10px transparent, 
        32px -16px 0 -10px transparent, 
        32px 16px 0 -10px transparent, 
        0 36px 0 -10px transparent, 
        -32px 16px 0 -10px transparent, 
        -32px -16px 0 -10px transparent;
    }
  }
`;