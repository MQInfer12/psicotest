import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "../components/answers/pagination";
import { WhiteIconButton } from "../styles/formularios";
import { getRespuestas } from "../services/respuesta";

const AnswersContainer = styled.div`
  height: 100%;
  box-shadow: 0px 8px 34px rgba(0, 0, 0, 0.1);
  background-color: #EBF0FA;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  padding: 0px 11px;
`;

//TABLA
const TableContainer = styled.div`
  height: 100%;
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
  color: #171C26;
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
  background-color: ${props => props.estado == 0? "#E9EDF5" :
                               props.estado == 1? "#F0F1FA" :
                               props.estado == 2? "#E1FCEF" :
                               props.estado == 3 && "#FAF0F3"};
  color: ${props => props.estado == 0? "#5A6376" :
                    props.estado == 1? "#4F5AED" :
                    props.estado == 2? "#14804A" :
                    props.estado == 3 && "#D12953"};
`;

const PPuntaje = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #464F60;
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
  color: #171C26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
`;

const TrCargando = styled.tr`
  display: flex;
  width: 622px;
  height: 512px;
`;

const TdCargando = styled.td`
  background-color: #FFFFFF;
  display: flex;
  width: 622px;
  height: 512px;
`;

const Answers = () => {
  const [respuestas, setRespuestas] = useState([]);

  const llenarRespuestas = async () => {
    const res = await getRespuestas();
    const resJson = await res?.json();
    console.log(resJson);
  }

  useEffect(() => {
    //llenarRespuestas();
  }, [])

  return (
    <AnswersContainer>
      <ControlsContainer>
      </ControlsContainer>
      <TableContainer>
        <TableAnswers>
          <thead>
            <tr>
              <ThNumberal>#</ThNumberal>
              <ThAnswer width="180px">Nombre</ThAnswer>
              <ThAnswer>Test</ThAnswer>
              <ThAnswer width="180px">Docente</ThAnswer>
              <ThAnswer width="100px">Estado</ThAnswer>
              <ThAnswer width="100px">Puntuación</ThAnswer>
              <ThAnswer width="120px">Controles</ThAnswer>
            </tr>
          </thead>
          <tbody>
            <tr>
              <ThNumber>1</ThNumber>
              <td>
                <DivDouble>
                  <PNombre>Admin</PNombre>
                  <PLight>admin@gmail.com</PLight>
                </DivDouble>
              </td>
              <td>
                <DivDouble>
                  <PLight>Videojuegos y vida diaria</PLight>
                  <PLight>Mide la influencia de los videojuegos en la vida diaria</PLight>
                </DivDouble>
              </td>
              <td>
                <DivDouble>
                  <PNombre>Mauricio Molina</PNombre>
                  <PLight>maummq@gmail.com</PLight>
                </DivDouble>
              </td>
              <td>
                <DivDouble>
                  <StatusContainer estado="0">Pendiente</StatusContainer>
                </DivDouble>
              </td>
              <td>
                <DivDouble>
                  <PPuntaje>30 pts.</PPuntaje>
                  <PSobre>/35</PSobre>
                </DivDouble>
              </td>
              <td>
                <DivCenter>
                  <WhiteIconButton><i className="fa-solid fa-eye"></i></WhiteIconButton>
                </DivCenter>
              </td>
            </tr>
          </tbody>
        </TableAnswers>
      </TableContainer>
      <Pagination 
        cant="32"
        rows="9"
        page="1"
        setPage={() => {}}
      />
    </AnswersContainer>
  )
}

export default Answers;