import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getIdTest, getRespuesta } from "../services/respuesta";
import { getFullTest } from "../services/test";
import Cargando from "../components/globals/cargando";
import { useDownloadExcel } from "react-export-table-to-excel";
import decipherId from "../utilities/decipher";
import AnswerReports from "../components/answer/answerReports";
import { WhiteButton } from "../styles/formularios";
import { 
  AnswersContainer, TableContainer, TableAnswers, 
  ThNumberal, ThAnswer
} from "../styles/table";
import BigRow from "../components/answer/bigRow";
import MiniRow from "../components/answer/miniRow";

const Answer = () => {
  const { idRespuesta: idCode } = useParams();
  const idRespuesta = Number(decipherId(idCode));

  const [tableRef, setTableRef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [respuesta, setRespuesta] = useState({});
  const [screen, setScreen] = useState(window.innerWidth);

  const [test, setTest] = useState({
    secciones: [{ reactivos: [], preguntas: [{ puntuaciones: [] }] }],
  });

  const llenarRespuesta = async () => {
    const res = await getRespuesta(idRespuesta);
    const resJson = await res?.json();
    //RESPUESTA CON PUNTUACIONES
    setRespuesta(resJson);
  };

  const llenarTest = async () => {
    const res = await getIdTest(idRespuesta);
    const resJson = await res?.json();
    const resTest = await getFullTest(resJson.id_test);
    const resTestJson = await resTest?.json();
    //TEST PARA DIBUJARLO EN LA PAGINA
    setTest(resTestJson);
    setLoading(false);
  };

  const { onDownload } = useDownloadExcel({
    filename: "Respuesta" + respuesta.nombre_user?.replaceAll(' ', '') + respuesta.nombre_test?.replaceAll(' ', ''),
    sheet:"Respuesta",
    currentTableRef: tableRef?.current
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreen(window.innerWidth);
    })

    llenarRespuesta();
    llenarTest();
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

  return loading ? (
    <CargandoContainer>
      <Cargando />
    </CargandoContainer>
  ) : (
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
        secciones={test.secciones} 
        respuesta={respuesta} 
        setTableRef={setTableRef} 
      />
      {test.secciones.map((seccion, i) => (
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
                        <ThAnswer center width="90px">Puntaje</ThAnswer>
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
                      />
                    ) : (
                      <MiniRow 
                        key={j}
                        index={j}
                        pregunta={pregunta}
                        respuesta={respuesta}
                        cantReactivos={seccion.reactivos.length}
                      />
                    )
                  ))}
                </tbody>
              </TableAnswers>
            </TableContainer>
            {/* ================ */}
          </AnswersContainer>
        </SeccionContainer>
      ))}
    </AnswerPage>
  );
};

export default Answer;

const CargandoContainer = styled.div`
  height: 100%;
`;

const AnswerPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100%;
  align-items: center;
`;

const DataContainer = styled.div`
  background-color: #ffffff;
  padding: 24px 64px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 370px;
`;

const DataKey = styled.strong`
  font-weight: 500;
  font-size: 16px;
  color: #3e435d;
`;

const DataValue = styled.p`
  color: #ada7a7;
  font-weight: 300;
  font-size: 14px;
  white-space: nowrap;
`;

const SeccionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

//TABLA

const TitleSeccion = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #3e435d;
  width: 100%;
  text-align: start;
`;