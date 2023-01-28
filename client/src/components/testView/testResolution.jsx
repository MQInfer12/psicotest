import React, { useEffect } from "react";
import { useState } from "react";
import { updateRespuesta } from "../../services/respuesta";
import ConfirmModal from "../globals/confirmModal";
import PageSlider from "./pageSlider";
import { useContext } from 'react';
import { ThanksContext } from '../../context/thanksContext';
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { 
  PreguntasContainer, ResolutionTitle, StartText, 
  StartTextPurple, TestResolutionContainer, TestResolveContainer
} from "../../styles/pages/testView";
import SeccionMapper from "./seccionMapper";

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
  }, [secciones]);

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
      <TestResolveContainer>
        <PreguntasContainer>
          <SeccionMapper 
            cont={cont}
            indexPregunta={indexPregunta}
            preguntas={preguntas}
            preguntasTotales={preguntasTotales}
            secciones={secciones}
            setResultados={setResultados}
          />
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
      </TestResolveContainer>
    </TestResolutionContainer>
  );
};

export default TestResolution;