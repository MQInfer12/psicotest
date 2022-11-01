import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const AnswerReports = ({ seccion, respuesta, setTableRef }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    setTableRef(tableRef);
  }, [])

  return (
    <TableAnswers ref={tableRef}>
      <thead>
        <tr>
          <ThNumberal>#</ThNumberal>
          <ThAnswer>Pregunta</ThAnswer>
          <ThReactivo width="90px">Puntaje</ThReactivo>
          {seccion?.reactivos.map((reactivo, j) => (
            <ThReactivo width="90px" key={j}>
              {reactivo.descripcion}
            </ThReactivo>
          ))}
        </tr>
      </thead>
      <tbody>
        {seccion?.preguntas.map((pregunta, j) => (
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
  )
}

export default AnswerReports;

const TableAnswers = styled.table`
  display: none;
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

const TableHidden = styled.div`
  display: none;
  overflow: hidden;
`;