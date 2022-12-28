import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cargando from "../components/globals/cargando";
import { useDownloadExcel } from "react-export-table-to-excel";
import decipherId from "../utilities/decipher";
import AnswerReports from "../components/answer/answerReports";
import { WhiteButton } from "../styles/globals/formularios";
import { 
  AnswersContainer, TableContainer, TableAnswers, 
  ThNumberal, ThAnswer
} from "../styles/globals/table";
import BigRow from "../components/answer/bigRow";
import MiniRow from "../components/answer/miniRow";
import { useWindowHeight } from "../hooks/useWindowHeight";
import useGet from "../hooks/useGet";
import { AnswerPage, DataContainer, DataKey, DataRow, DataValue, SeccionContainer, TitleSeccion } from "../styles/pages/answer";

const Answer = () => {
  const windowHeight = useWindowHeight(true, true);
  const { idRespuesta: idCode } = useParams();
  const idRespuesta = Number(decipherId(idCode));
  const [tableRef, setTableRef] = useState(null);
  const [screen, setScreen] = useState(window.innerWidth);

  const { resJson: respuesta, loading } = useGet(`respuesta/${idRespuesta}`);

  const { onDownload } = useDownloadExcel({
    filename: "Respuesta" + respuesta.nombre_user?.replaceAll(' ', '') + respuesta.nombre_test?.replaceAll(' ', ''),
    sheet:"Respuesta",
    currentTableRef: tableRef?.current
  });

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
      <WhiteButton onClick={onDownload}><i className="fa-regular fa-file-excel"></i> Exportar a excel</WhiteButton>
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
      {respuesta.test.secciones.map((seccion, i) => (
        <SeccionContainer key={i}>
          <TitleSeccion>Sección {i + 1}</TitleSeccion>
          <AnswersContainer maxw="1200px">
            <TableContainer>
              <TableAnswers>
                <thead>
                  <tr>
                    <ThNumberal>#</ThNumberal>
                    {
                      screen >= 1000 &&
                      <>
                        <ThAnswer>Pregunta</ThAnswer>
                        {
                          /* TODO: PUNTUACIONES EN MULTIMARCADO */
                          !seccion.multimarcado &&
                          <ThAnswer center width="90px">Puntaje</ThAnswer>
                        }
                      </>
                    }
                    {seccion.reactivos.map((reactivo, j) => (
                      <ThAnswer center width={screen >= 1000 ? "90px" : undefined} key={j}>
                        {reactivo.descripcion}
                      </ThAnswer>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seccion.preguntas.map((pregunta, j) => (
                    screen >= 1000 ? (
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