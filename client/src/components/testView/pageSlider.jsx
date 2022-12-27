import React from 'react';
import { ButtonTransparent, IconButton, PButton, SliderContainer } from '../../styles/pages/testView';

const PageSlider = ({ resultados, indexPregunta, setIndexPregunta, preguntasTotales, activateSend, infoSend, openModal, preguntas }) => {
  return (
    <SliderContainer>
      <ButtonTransparent
        onClick={() => indexPregunta != 0 && setIndexPregunta(indexPregunta - 1)}
        disabled={indexPregunta === 0}
      >
        <IconButton className="fa-solid fa-arrow-left"></IconButton>
        <PButton>Pregunta anterior</PButton>
      </ButtonTransparent>
      {indexPregunta === preguntasTotales - 1 ? (
        activateSend ? (
          <ButtonTransparent 
            onClick={openModal}
            disabled={!Object.keys(resultados).includes(String(indexPregunta + 1))}
          >
            <PButton>Enviar Test</PButton>
            <IconButton className="fa-solid fa-share-from-square"></IconButton>
          </ButtonTransparent>
        ) : (
          <p>{infoSend}</p>
        )
      ) : (
        <ButtonTransparent
          onClick={() => setIndexPregunta(indexPregunta + 1)}
          disabled={(!Object.keys(resultados).includes(String(indexPregunta + 1)) && !preguntas[indexPregunta]?.seccion.vacio) && activateSend}
        >
          <PButton>Pregunta siguiente</PButton>
          <IconButton className="fa-solid fa-arrow-right"></IconButton>
        </ButtonTransparent>
      )}
    </SliderContainer>
  )
}

export default PageSlider