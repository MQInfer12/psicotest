import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { updateRespuesta } from "../../services/respuesta";
import ConfirmModal from "../globals/confirmModal";
import RadioButton from "./radioButton";
import PageSlider from "./pageSlider";
import { useContext } from 'react';
import { ThanksContext } from '../../context/thanksContext';
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

const TestResolution = ({
  nombreTest,
  secciones,
  activateSend,
  infoSend,
  idRespuesta
}) => {
  const navigate = useNavigate();
  const { setActivateThanks } = useContext(ThanksContext);
  const [preguntasTotales, setPreguntasTotales] = useState(0);
  const [indexPregunta, setIndexPregunta] = useState(0);
  const [resultados, setResultados] = useState({});

  let cont = 0;
  let preguntas = [];

  const handleSubmit = async () => {
    const form = {
      puntuaciones: resultados,
    };
    const res = await updateRespuesta(form, idRespuesta);
    const resJson = await res?.json();
    if (resJson.mensaje == "se guardo correctamente") {
      setActivateThanks(true);
      navigate('/dashboard/tests/thanks');
    }
  };

  useEffect(() => {
    let contPreguntas = 0;
    secciones.forEach((seccion) => {
      contPreguntas += seccion.preguntas.length;
    });
    setPreguntasTotales(contPreguntas);
  }, []);

  const { openModal, closeModal } = useModal(
    "",
    <ConfirmModal
      sure={handleSubmit}
      cerrar={() => closeModal()}
      text="No podrás modificar tus respuestas luego"
    />
  )

  return (
    <TestResolutionContainer>
      <ResolutionTitle>{nombreTest}</ResolutionTitle>
      {
        activateSend ? (
          <StartText>Comienza tu test</StartText>
        ) : (
          <StartTextPurple>¡{infoSend}!</StartTextPurple>
        )
      }

      <TestContainer>
        <PreguntasContainer>
          {secciones.map((seccion, i) =>
            seccion.preguntas.map((pregunta, j) => {
              cont++;
              preguntas.push({seccion, pregunta});
              return (
                <UnaPreguntaContainer key={j} translate={indexPregunta}>
                  <PreguntaContainer>
                    <PreguntaIndex>
                      P{cont}: {cont}/{preguntasTotales}
                    </PreguntaIndex>
                    <Pregunta>{pregunta.descripcion}</Pregunta>
                  </PreguntaContainer>
                  <ReactivosContainer>
                    {seccion.reactivos.map((reactivo, k) => (
                      <RadioButton 
                        key={k} 
                        indice={cont}
                        setResultados={setResultados}
                        valor={pregunta.puntuaciones.find(puntuacion => puntuacion.id_reactivo == reactivo.id).id}
                        descripcion={reactivo.descripcion}
                        multimarcado={seccion.multimarcado}
                      />
                    ))}
                  </ReactivosContainer>
                </UnaPreguntaContainer>
              );
            })
          )}
        </PreguntasContainer>

        <PageSlider
          resultados={resultados}
          indexPregunta={indexPregunta}
          setIndexPregunta={setIndexPregunta}
          preguntasTotales={preguntasTotales}
          activateSend={activateSend}
          infoSend={infoSend}
          openModal={openModal}
          preguntas={preguntas}
        />
      </TestContainer>
    </TestResolutionContainer>
  );
};

export default TestResolution;

const TestResolutionContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ResolutionTitle = styled.h1`
  font-size: 60px;
  font-weight: 600;
  padding-bottom: 16px;
  text-align: center;
  width: fit-content;
  &::after {
    content: ".";
    color: #6209db;
  }

  @media (max-width: 600px) {
    font-size: 48px;
    line-height: 60px;
  }
`;

const StartText = styled.h4`
  font-size: 20px;
  font-weight: 400;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const StartTextPurple = styled.h4`
  font-size: 20px;
  font-weight: 400;
  color: #6209db;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const TestContainer = styled.div`
  margin-top: 40px;
  background: #6209db;
  border-radius: 15px;
  color: #ffffff;
  position: relative;
  overflow: hidden;
`;

const PreguntasContainer = styled.div`
  min-height: 471px;
  height: max-content;
  display: flex;
  overflow: hidden;
`;

const UnaPreguntaContainer = styled.div`
  transform: translateX(${(props) => props.translate * -100}%);
  min-width: 100%;
  padding: 40px;
  gap: 36px;
  display: flex;
  transition: all 1s;

  @media (max-width: 1260px) {
    flex-direction: column;
    gap: 16px;
    padding: 24px;
  }
`;

const PreguntaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`;

const PreguntaIndex = styled.h2`
  font-weight: 600;
  font-size: 24px;
`;

const Pregunta = styled.h3`
  font-weight: 600;
  font-size: 24px;

  @media (max-width: 1260px) {
    font-size: 18px;
  }

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ReactivosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;