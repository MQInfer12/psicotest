import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Cargando from "../components/globals/cargando";
import { useDownloadExcel } from "react-export-table-to-excel";
import decipherId from "../utilities/decipher";
import AnswerReports from "../components/answer/answerReports";
import { WhiteButton, WhiteIconButton } from "../styles/globals/formularios";
import { AnswersContainer, TableContainer, TableAnswers, ThNumberal, ThAnswer, PLight } from "../styles/globals/table";
import BigRow from "../components/answer/bigRow";
import MiniRow from "../components/answer/miniRow";
import { useWindowHeight } from "../hooks/useWindowHeight";
import useGet from "../hooks/useGet";
import { AnswerPage, ButtonsContainer, DataContainer, DataKey, DataRow, DataValue, InterpretationContainer, InterpretationMessage, SeccionContainer, TitleSeccion } from "../styles/pages/answer";
import Totals from "../components/answer/totals";
import { generateInterpretation, generateInterpretationOpenAI, saveInterpretation } from "../services/respuesta";
import BfqGraph from "../components/answer/bfqGraph";

const Answer = () => {
  const windowHeight = useWindowHeight(true, true);
  const { idRespuesta: idCode } = useParams();
  const idRespuesta = Number(decipherId(idCode));
  const [tableRef, setTableRef] = useState(null);
  const [screen, setScreen] = useState(window.innerWidth);
  const [loadingIA, setLoadingIA] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const interpretationRef = useRef();

  const { resJson: respuesta, setResJson, loading } = useGet(`respuesta/${idRespuesta}`, {
    alwaysLoading: true
  });

  const { onDownload } = useDownloadExcel({
    filename: "Respuesta" + respuesta.nombre_user?.replaceAll(' ', '') + respuesta.nombre_test?.replaceAll(' ', ''),
    sheet:"Respuesta",
    currentTableRef: tableRef?.current
  });

  const saveEdition = async (text) => {
    setLoadingSave(true);
    const interpretation = text || interpretationRef.current.innerText;
    const res = await saveInterpretation(respuesta.id, interpretation);
    const resJson = await res.json();
    setResJson(old => ({...old, interpretation: resJson.data }));
    setLoadingSave(false);
  }
  
  const sendEmail = async () => {
    await saveEdition();
    const interpretation = interpretationRef.current.innerText;
    window.open(`mailto:${respuesta.email_user}?subject=Tu respuesta a ${respuesta.nombre_test}&body=${interpretation}`, '_blank');
  }

  const handleIA = async () => {
    setLoadingIA(true);
    let text = "";
    await generateInterpretationOpenAI(respuesta.prompt, stream => {
      text += stream;
      setResJson(old => ({...old, interpretation: text }));
    });
    setLoadingIA(false);
    saveEdition(text);
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreen(window.innerWidth);
    })
  }, []);

  const data = [
    {
      key: "Test",
      value: respuesta.nombre_test,
    },
    {
      key: "Nombre",
      value: respuesta.nombre_user,
    },
    {
      key: "Email",
      value: respuesta.email_user,
    },
    {
      key: "Edad",
      value: respuesta.edad,
    },
    {
      key: "Genero",
      value:
        respuesta.genero?.charAt(0).toUpperCase() + respuesta.genero?.slice(1),
    },
  ];

  if(loading) return (<Cargando container windowHeight={windowHeight} />);

  return (
    <AnswerPage>
      <WhiteButton onClick={onDownload}><i className="fa-regular fa-file-excel"></i>Exportar a excel</WhiteButton>
      <DataContainer>
        {data.map((v, i) => (
          <DataRow key={i}>
            <DataKey>{v.key}</DataKey>
            <DataValue>{v.value}</DataValue>
          </DataRow>
        ))}
      </DataContainer>
      <AnswerReports 
        secciones={respuesta.test.secciones} 
        respuesta={respuesta} 
        setTableRef={setTableRef} 
      />
      {
        respuesta.test.dimensiones.length != 0 &&
        <Totals test={respuesta.test} />
      }
      <SeccionContainer>
        <TitleSeccion center>Interpretación</TitleSeccion>
        <WhiteButton 
          disabled={respuesta.estado === 0 || loadingIA}
          onClick={handleIA}
        >
          {
            respuesta.estado === 0 ? "Aún no se realizó el test" : 
            loadingIA ? "Cargando..." :
            respuesta.interpretation ? "Volver a generar" : "Generar con Inteligencia Artificial"
          }
        </WhiteButton>
        {
          respuesta.interpretation &&
          <>
          <InterpretationContainer>
            <InterpretationMessage 
              ref={interpretationRef} 
              contentEditable
              suppressContentEditableWarning
            >{respuesta.interpretation}</InterpretationMessage>
          </InterpretationContainer>
          <ButtonsContainer>
            <WhiteIconButton 
              disabled={loadingIA}
              onClick={sendEmail} 
              title="Guardar y enviar por correo"
            >
              <i className="fa-solid fa-envelope"></i>
            </WhiteIconButton>
            <WhiteIconButton 
              disabled={loadingSave || loadingIA} 
              onClick={() => saveEdition()} 
              title="Guardar"
            >
              <i className="fa-solid fa-floppy-disk"></i>
            </WhiteIconButton>
          </ButtonsContainer>
          </>
        }
      </SeccionContainer>
      {/*TODO: HARDCODED*/}
      {
        respuesta.nombre_test === "BIG FIVE" &&
        <SeccionContainer>
          <TitleSeccion center>Gráfico de BFQ</TitleSeccion>
          <BfqGraph test={respuesta.test} />
        </SeccionContainer>
      }
      {respuesta.test.secciones.map((seccion, i) => (
        <SeccionContainer key={i}>
          <TitleSeccion>{seccion.nombre}</TitleSeccion>
          <AnswersContainer maxw="1200px">
            <TableContainer>
              <TableAnswers>
                <thead>
                  <tr>
                    <ThNumberal>#</ThNumberal>
                    {
                      screen >= 1200 &&
                      <>
                        <ThAnswer>Pregunta</ThAnswer>
                        <ThAnswer center width="90px">Puntaje</ThAnswer>
                      </>
                    }
                    {seccion.reactivos.map((reactivo, j) => (
                      <ThAnswer border center w={screen >= 1200 && "90px"} key={j}>
                        {reactivo.descripcion}
                      </ThAnswer>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seccion.preguntas.map((pregunta, j) => (
                    screen >= 1200 ? (
                      <BigRow 
                        key={j}
                        index={j}
                        pregunta={pregunta}
                        respuesta={respuesta}
                        multimarcado={seccion.multimarcado}
                      />
                    ) : (
                      <MiniRow 
                        key={j}
                        index={j}
                        pregunta={pregunta}
                        respuesta={respuesta}
                        cantReactivos={seccion.reactivos.length}
                        multimarcado={seccion.multimarcado}
                      />
                    )
                  ))}
                </tbody>
              </TableAnswers>
            </TableContainer>
          </AnswersContainer>
        </SeccionContainer>
      ))}
    </AnswerPage>
  );
};

export default Answer;