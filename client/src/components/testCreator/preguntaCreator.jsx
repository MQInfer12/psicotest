import React from "react";
import styled from "styled-components";
import { DangerIconButton } from "../../styles/formularios";

const PreguntaCreatorContainer = styled.div`
  width: 622px;
  box-shadow: 0px 8px 34px rgba(0, 0, 0, 0.1);
  background-color: #EBF0FA;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 68px;
  padding: 0px 21px;
`;

const PSelected = styled.p`
  height: max-content;
  font-size: 12px;
  color: #464F60;
`;

//TABLA
const TableContainer = styled.div`
  height: 552px;
`;

const TablePreguntas = styled.table`
  border-collapse: collapse;
  width: 100%;

  & > thead {
    height: 40px;
  }

  & > tbody > tr {
    line-height: 64px;
    background-color: #FFFFFF;
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

const ThPregunta = styled.th`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: start;
  color: #464F60;
`;

const ThNumber = styled.th`
  font-size: 14px;
  font-weight: 500;
  color: #171C26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
`;

const TdPregunta = styled.td`
  color: #464F60;
  font-weight: 400;
  font-size: 14px;
  text-align: start;
`;

//PAGINACION ABAJO
const PaginationContainer = styled.div`
  padding: 35px 20px 0px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaginationCounter = styled.p`
  font-size: 12px;
  color: #687182;
`;

const ChangePageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const RowsPage = styled.p`
  font-size: 12px;
  color: #687182;
`;

const ButtonPagContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonChange = styled.button`
  box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.24);
  width: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7px;
  color: #868FA0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const PreguntaCreator = () => {
  return (
    <PreguntaCreatorContainer>
      <ControlsContainer>
        <PSelected>1 selected</PSelected>
        <DangerIconButton><i className="fa-solid fa-trash-can"></i></DangerIconButton>
      </ControlsContainer>
      <TableContainer>
        <TablePreguntas>
          <thead>
            <tr>
              <ThNumberal>#</ThNumberal>
              <ThPregunta>PREGUNTA</ThPregunta>
            </tr>
          </thead>
          <tbody>
            <tr>
              <ThNumber>1</ThNumber>
              <TdPregunta>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</TdPregunta>
            </tr>
            <tr>
              <ThNumber>2</ThNumber>
              <TdPregunta>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</TdPregunta>
            </tr>
            <tr>
              <ThNumber>3</ThNumber>
              <TdPregunta>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</TdPregunta>
            </tr>
            <tr>
              <ThNumber>4</ThNumber>
              <TdPregunta>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</TdPregunta>
            </tr>
            <tr>
              <ThNumber>5</ThNumber>
              <TdPregunta>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</TdPregunta>
            </tr>
            <tr>
              <ThNumber>6</ThNumber>
              <TdPregunta>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</TdPregunta>
            </tr>
            <tr>
              <ThNumber>7</ThNumber>
              <TdPregunta>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</TdPregunta>
            </tr>
            <tr>
              <ThNumber>8</ThNumber>
              <TdPregunta>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</TdPregunta>
            </tr>
          </tbody>
        </TablePreguntas>
      </TableContainer>
      <PaginationContainer>
        <PaginationCounter>1-10 de 97</PaginationCounter>
        <ChangePageContainer>
          <RowsPage>Filas por pagina: 10</RowsPage>
          <ButtonPagContainer>
            <ButtonChange><i className="fa-solid fa-arrow-left"></i></ButtonChange>
            <RowsPage>1/10</RowsPage>
            <ButtonChange><i className="fa-solid fa-arrow-right"></i></ButtonChange>
          </ButtonPagContainer>
        </ChangePageContainer>
      </PaginationContainer>
    </PreguntaCreatorContainer>
  )
}

export default PreguntaCreator;