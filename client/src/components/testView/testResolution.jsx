import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getFullTest } from "../../services/test";
import { useParams } from "react-router-dom";
import { updateRespuesta } from "../../services/respuesta";
import Modal from "../globals/modal";
import ConfirmModal from "../globals/confirmModal";
import { BlackTextLoader } from "../../styles/loaders";
import RadioButton from "./radioButton";

const TestResolution = ({
  loading,
  idTest,
  nombreTest,
  activateSend,
  setActivateSend,
  infoSend,
}) => {
  const { idRespuesta } = useParams();

  
  const [showAlert, setShowAlert] = useState(false);
  const [secciones, setSecciones] = useState([]);
  const [preguntasTotales, setPreguntasTotales] = useState(0);
  const [indexPregunta, setIndexPregunta] = useState(0);
  const [resultados, setResultados] = useState({});

  let cont = 0;

  const handleSubmit = async () => {
    const form = {
      puntuaciones: resultados,
    };
    const res = await updateRespuesta(form, idRespuesta);
    const resJson = await res?.json();
    if (resJson.mensaje == "se guardo correctamente") {
      setActivateSend(false);
    }
  };

  const llenarTestEntero = async () => {
    const res = await getFullTest(idTest);
    const resJson = await res?.json();
    setSecciones(resJson.secciones);

    let contPreguntas = 0;
    resJson.secciones.forEach((seccion) => {
      contPreguntas += seccion.preguntas.length;
    });
    setPreguntasTotales(contPreguntas);
  };

  useEffect(() => {
    if (idTest) {
      llenarTestEntero();
    }
  }, [idTest]);

  return (
    <TestResolutionContainer>
      {showAlert && (
        <Modal cerrar={() => setShowAlert(false)}>
          <ConfirmModal
            sure={handleSubmit}
            cerrar={() => setShowAlert(false)}
            text="No podrás modificar tus respuestas luego"
          />
        </Modal>
      )}
      {loading ? (
        <TitleContainer>
          <BlackTextLoader width="300px" fontSize="60px" />
        </TitleContainer>
      ) : (
        <ResolutionTitle>{nombreTest}</ResolutionTitle>
      )}
      <StartText>Comienza tu test</StartText>

      <TestContainer>
        <PreguntasContainer>
          {secciones.map((seccion, i) =>
            seccion.preguntas.map((pregunta, j) => {
              cont++;
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
                        setResultados={setResultados}
                        pregunta={pregunta}
                        reactivo={reactivo}
                      />
                    ))}
                  </ReactivosContainer>
                </UnaPreguntaContainer>
              );
            })
          )}
        </PreguntasContainer>

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
      </TestContainer>
    </TestResolutionContainer>
  );
};

export default TestResolution;

const TestResolutionContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0px 40px 65px;

  @media (max-width: 500px) {
    padding: 0px 20px 65px;
  }
`;

const TitleContainer = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
`;

const ResolutionTitle = styled.h1`
  font-size: 60px;
  font-weight: 600;
`;

const StartText = styled.h4`
  font-size: 20px;
  font-weight: 400;
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
  height: 471px;
  display: flex;
  overflow: hidden;

  @media (max-width: 1260px) {
    height: max-content;
  }
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
`;

const ReactivosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;

  @media (max-width: 1260px) {
    width: 100%;
  }
`;

/* const ReactivoTest = styled.p`
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  
`; */

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
