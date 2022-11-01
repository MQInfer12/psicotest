import React from "react";
import styled from "styled-components";

//TABLA

const TableContainer = styled.div`
  height: 100%;
  display: ${(props) => (props.tableHidden ? "none" : "block")};
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

const DivDouble = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 20px;
  text-align: start;
`;

const PNombre = styled.p`
  font-size: 14px;
  color: #171c26;
  font-weight: 500;
`;

const PLight = styled.p`
  color: #687182;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusContainer = styled.div`
  width: fit-content;
  border-radius: 10px;
  padding: 1px 10px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) =>
    props.estado == 0
      ? "#E9EDF5"
      : props.estado == 1
      ? "#F0F1FA"
      : props.estado == 2
      ? "#E1FCEF"
      : props.estado == 3 && "#FAF0F3"};
  color: ${(props) =>
    props.estado == 0
      ? "#5A6376"
      : props.estado == 1
      ? "#4F5AED"
      : props.estado == 2
      ? "#14804A"
      : props.estado == 3 && "#D12953"};
`;

const PPuntaje = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #464f60;
  width: 100%;
  text-align: end;
`;

const PSobre = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #687182;
  width: 100%;
  text-align: end;
`;

const DivCenter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThNumber = styled.th`
  font-size: 14px;
  font-weight: 500;
  color: #171c26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
`;

const AnswersReports = ({ tableRef, respuestas, tableHidden }) => {
  return (
    <TableContainer ref={tableRef} tableHidden={tableHidden}>
      <TableAnswers>
        <thead>
          <tr>
            <ThNumberal>#</ThNumberal>
            <ThAnswer width="180px">Nombre</ThAnswer>
            <ThAnswer>Test</ThAnswer>
            <ThAnswer width="180px">Docente</ThAnswer>
            <ThAnswer width="100px">Estado</ThAnswer>
            <ThAnswer width="100px">Puntuación</ThAnswer>
          </tr>
        </thead>
        <tbody>
          {respuestas.map((v, i) => (
            <tr key={i}>
              <ThNumber>{i + 1}</ThNumber>
              <td>
                <DivDouble>
                  <PNombre>{v.nombre_user}</PNombre>
                  <PLight>{v.email_user}</PLight>
                </DivDouble>
              </td>
              <td>
                <DivDouble>
                  <PLight>{v.nombre_test}</PLight>
                  <PLight>{v.descripcion}</PLight>
                </DivDouble>
              </td>
              <td>
                <DivDouble>
                  <PNombre>{v.nombre_docente}</PNombre>
                  <PLight>{v.email_docente}</PLight>
                </DivDouble>
              </td>
              <td>
                <DivDouble>
                  <StatusContainer estado={v.estado}>
                    {v.estado == 0
                      ? "Pendiente"
                      : v.estado == 1
                      ? "Recibido"
                      : v.estado == 2
                      ? "Corregido"
                      : v.estado == 3 && "Expiró"}
                  </StatusContainer>
                </DivDouble>
              </td>
              <td>
                <DivDouble>
                  <PPuntaje>{v.puntuacion}</PPuntaje>
                  <PSobre>/{v.total}</PSobre>
                </DivDouble>
              </td>
            </tr>
          ))}
        </tbody>
      </TableAnswers>
    </TableContainer>
  );
};

export default AnswersReports;
