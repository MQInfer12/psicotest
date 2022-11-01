import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getIdTest, getRespuesta } from "../services/respuesta";
import { getFullTest } from "../services/test";
import Cargando from "../components/globals/cargando";
import { DownloadTableExcel } from "react-export-table-to-excel";
import decipherId from "../utilities/decipher";
const Answer = () => {
  const { idRespuesta: idCode } = useParams();
  let replace = idCode.replaceAll("_", "/");
  const idRespuesta = Number(decipherId(replace));

  const tableRef = useRef(null);
  const [tableHidden, setTableHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [respuesta, setRespuesta] = useState({});
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

  useEffect(() => {
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

  const handleHidden = () => {
    setTableHidden(false);
    setTableHidden(true);
  };

  return loading ? (
    <CargandoContainer>
      <Cargando />
    </CargandoContainer>
  ) : (
    <AnswerPage>
      <DataContainer>
        {data.map((v, i) => (
          <DataRow key={i}>
            <DataKey>{v.key}</DataKey>
            <DataValue>{v.value}</DataValue>
          </DataRow>
        ))}
      </DataContainer>
      <DownloadTableExcel
        filename="respuestas Filtradas"
        sheet="respuestas"
        currentTableRef={tableRef.current}
      >
        <button onClick={handleHidden}> Exportar a excel </button>
      </DownloadTableExcel>
      {test.secciones.map((seccion, i) => (
        <SeccionContainer key={i}>
          <TitleSeccion>Sección {i + 1}</TitleSeccion>
          <AnswersContainer>
            <TableContainer>
              <TableAnswers>
                <thead>
                  <tr>
                    <ThNumberal>#</ThNumberal>
                    <ThAnswer>Pregunta</ThAnswer>
                    <ThReactivo width="90px">Puntaje</ThReactivo>
                    {seccion.reactivos.map((reactivo, j) => (
                      <ThReactivo width="90px" key={j}>
                        {reactivo.descripcion}
                      </ThReactivo>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seccion.preguntas.map((pregunta, j) => (
                    <tr key={j}>
                      <ThNumber>{j + 1}</ThNumber>
                      <td>
                        <DivDouble>
                          <PLightDouble>{pregunta.descripcion}</PLightDouble>
                        </DivDouble>
                      </td>
                      <td>
                        {respuesta.resultados
                          .filter(
                            (resultado) =>
                              resultado.puntuacion[0].id_pregunta == pregunta.id
                          )
                          .map((puntaje, k) => (
                            <PLight key={k}>
                              {puntaje.puntuacion[0].asignado}
                            </PLight>
                          ))}
                      </td>
                      {pregunta.puntuaciones.map((puntuacion, k) => (
                        <td key={k}>
                          <input
                            type="radio"
                            name={pregunta.id}
                            value={puntuacion.id}
                            disabled
                            defaultChecked={
                              respuesta.resultados.filter(
                                (resultado) =>
                                  puntuacion.id == resultado.id_puntuacion
                              )[0]
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </TableAnswers>
            </TableContainer>
            {/* ================ */}

            <TableHidden ref={tableRef} tableHidden={tableHidden}>
              <TableAnswers>
                <thead>
                  <tr>
                    <ThNumberal>#</ThNumberal>
                    <ThAnswer>Pregunta</ThAnswer>
                    <ThReactivo width="90px">Puntaje</ThReactivo>
                    {seccion.reactivos.map((reactivo, j) => (
                      <ThReactivo width="90px" key={j}>
                        {reactivo.descripcion}
                      </ThReactivo>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seccion.preguntas.map((pregunta, j) => (
                    <tr key={j}>
                      <ThNumber>{j + 1}</ThNumber>
                      <td>
                        <DivDouble>
                          <PLightDouble>{pregunta.descripcion}</PLightDouble>
                        </DivDouble>
                      </td>
                      <td>
                        {respuesta.resultados
                          .filter(
                            (resultado) =>
                              resultado.puntuacion[0].id_pregunta == pregunta.id
                          )
                          .map((puntaje, k) => (
                            <PLight key={k}>
                              {puntaje.puntuacion[0].asignado}
                            </PLight>
                          ))}
                      </td>
                      {pregunta.puntuaciones.map((puntuacion, k) => (
                        <td key={k}>
                          <PLight>
                            {respuesta.resultados.filter(
                              (resultado) =>
                                puntuacion.id == resultado.id_puntuacion
                            ).length === 0
                              ? ""
                              : 1}
                          </PLight>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </TableAnswers>
            </TableHidden>
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
  width: 350px;
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
`;

const SeccionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const AnswersContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  box-shadow: 0px 8px 34px rgba(0, 0, 0, 0.1);
  background-color: #ebf0fa;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

//TABLA

const TableContainer = styled.div`
  overflow: hidden;
`;

const TableAnswers = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;

  & > thead {
    height: 40px;
  }

  & > tbody > tr {
    max-width: 622px;
    height: 64px;
    background-color: #ffffff;
    position: relative;
    text-align: center;
  }

  & > tbody > tr:nth-child(2n) {
    background-color: #ebf0fa;
  }
`;

const ThNumberal = styled.th`
  font-size: 11px;
  color: #171c26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
  font-weight: 600;
`;

const ThAnswer = styled.th`
  width: ${(props) => props.width};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: start;
  color: #464f60;
`;

const ThReactivo = styled.th`
  width: ${(props) => props.width};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  color: #464f60;
`;

const DivDouble = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: start;
`;

const PLight = styled.p`
  color: #687182;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PLightDouble = styled.p`
  padding-right: 10px;
  color: #687182;
  font-size: 12px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ThNumber = styled.th`
  font-size: 14px;
  font-weight: 500;
  color: #171c26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
`;

const TitleSeccion = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #3e435d;
  width: 100%;
  text-align: start;
`;

const TableHidden = styled.div`
  display: ${(props) => (props.tableHidden ? "none" : "block")};
  overflow: hidden;
`;
