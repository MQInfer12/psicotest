import React from 'react';
import styled from 'styled-components';

const PageSlider = ({ indexPregunta, setIndexPregunta, preguntasTotales, activateSend, setShowAlert }) => {
  return (
    <SliderContainer>
      <ButtonTransparent
        onClick={() => {
          if (indexPregunta != 0) {
            setIndexPregunta(indexPregunta - 1);
          }
        }}
      >
        <IconButton className="fa-solid fa-arrow-left"></IconButton>
        <PButton>Pregunta anterior</PButton>
      </ButtonTransparent>
      {indexPregunta == preguntasTotales - 1 ? (
        activateSend ? (
          <ButtonTransparent onClick={() => setShowAlert(true)}>
            <PButton>Enviar Test</PButton>
            <IconButton className="fa-solid fa-share-from-square"></IconButton>
          </ButtonTransparent>
        ) : (
          <p>{infoSend}</p>
        )
      ) : (
        <ButtonTransparent
          onClick={() => setIndexPregunta(indexPregunta + 1)}
        >
          <PButton>Pregunta siguiente</PButton>
          <IconButton className="fa-solid fa-arrow-right"></IconButton>
        </ButtonTransparent>
      )}
    </SliderContainer>
  )
}

export default PageSlider

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 40px;
  justify-content: space-between;
  border-top: 1px solid #d9d9d9;
  gap: 15px;

  @media (max-width: 1260px) {
    background-color: #6209db;
    padding: 17px 20px;
    height: max-content;
    border-top: none;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 15px;
  }
`;

const ButtonTransparent = styled.div`
  background-color: transparent;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  gap: 25px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #5a08cc;
  }
`;

const IconButton = styled.div`
  font-size: 18px;
  color: #d9d9d9;
`;

const PButton = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #d9d9d9;

  @media (max-width: 1260px) {
    display: none;
  }
`;
