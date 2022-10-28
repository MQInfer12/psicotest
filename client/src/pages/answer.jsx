import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getIdTest, getRespuesta } from "../services/respuesta";
import { getFullTest } from "../services/test";
import Cargando from "../components/globals/cargando";

const Answer = () => {
  const { idRespuesta } = useParams();
  const [loading, setLoading] = useState(true);
  const [respuesta, setRespuesta] = useState({});
  const [test, setTest] = useState({secciones: [{reactivos: [], preguntas: [{puntuaciones: []}]}]});

  const llenarRespuesta = async () => {
    const res = await getRespuesta(idRespuesta);
    const resJson = await res?.json();
    //RESPUESTA CON PUNTUACIONES
    setRespuesta(resJson);
  }

  const llenarTest = async () => {
    const res = await getIdTest(idRespuesta);
    const resJson = await res?.json();
    const resTest = await getFullTest(resJson.id_test);
    const resTestJson = await resTest?.json();
    //TEST PARA DIBUJARLO EN LA PAGINA
    setTest(resTestJson);
    setLoading(false);
  }

  useEffect(() => {
    llenarRespuesta();
    llenarTest();
  }, []);

  return (
    <AnswerPage>
      {
        loading ? (
          <Cargando />
        ) : (
          test.secciones.map((seccion, i) => (
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
                        {
                          seccion.reactivos.map((reactivo, j) => (
                            <ThReactivo width="90px" key={j}>{reactivo.descripcion}</ThReactivo>
                          ))
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        seccion.preguntas.map((pregunta, j) => (
                        <tr key={j}>
                          <ThNumber>{j + 1}</ThNumber>
                          <td>
                            <DivDouble>
                              <PLightDouble>
                                {pregunta.descripcion}
                              </PLightDouble>
                            </DivDouble>
                          </td>
                          <td>
                            {
                              respuesta.resultados.filter(resultado => 
                                resultado.puntuacion[0].id_pregunta == pregunta.id
                              ).map((puntaje, k) => (
                                <PLight key={k}>{puntaje.puntuacion[0].asignado}</PLight>
                              ))
                            }
                          </td>
                          {
                            pregunta.puntuaciones.map((puntuacion, k) => (
                              <td key={k}>
                                <input
                                  type="radio"
                                  name={pregunta.id}
                                  value={puntuacion.id}
                                  disabled
                                  defaultChecked={
                                    respuesta.resultados.filter(resultado => puntuacion.id == resultado.id_puntuacion)[0]
                                  }
                                />
                              </td>
                            ))
                          }
                        </tr>
                        ))
                      }
                    </tbody>
                  </TableAnswers>
                </TableContainer>
              </AnswersContainer>
            </SeccionContainer>
          ))
        )
      }
    </AnswerPage>
  )
}

export default Answer;

const AnswerPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
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
  background-color: #EBF0FA;
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
    background-color: #FFFFFF;
    position: relative;
    text-align: center;
  }

  & > tbody > tr:nth-child(2n) {
    background-color: #EBF0FA;
  }
`;

const ThNumberal = styled.th`
  font-size: 11px;
  color: #171C26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
  font-weight: 600;
`;

const ThAnswer = styled.th`
  width: ${props => props.width};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: start;
  color: #464F60;
`;

const ThReactivo = styled.th`
  width: ${props => props.width};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  color: #464F60;
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
  color: #171C26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
`;

const TitleSeccion = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #3E435D;
  width: 100%;
  text-align: start;
`;