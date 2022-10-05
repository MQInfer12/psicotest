import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DangerIconButton, WhiteIconButton } from "../../styles/formularios";
import Cargando from "../globals/cargando";
import { getPreguntasBySeccion } from "../../services/pregunta";
import Modal from "../globals/modal";
import ModalPregunta from "./modalPregunta";
import PreguntaCard from "./preguntaCard";

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
  justify-content: space-between;
  height: 68px;
  padding: 0px 21px;
`;

const DeleteContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const PSelected = styled.p`
  height: max-content;
  font-size: 12px;
  color: #464F60;
`;

//TABLA
const TableContainer = styled.div`
  height: 552px;
  overflow: hidden;
`;

const TablePreguntas = styled.table`
  border-collapse: collapse;
  width: 100%;

  & > thead {
    height: 40px;
  }

  & > tbody > tr {
    max-width: 622px;
    line-height: 64px;
    background-color: #FFFFFF;
    position: relative;
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

const TrCargando = styled.tr`
  display: flex;
  width: 622px;
  height: 512px;
`;

const TdCargando = styled.td`
  display: flex;
  width: 100%;
  height: 100%;
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
  letter-spacing: 0.03em;
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
  width: 100px;
  display: flex;
  justify-content: space-between;
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

const PreguntaCreator = ({ idSeccion }) => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [preguntasPage, setPreguntasPage] = useState(1);

  const llenarPreguntas = async () => {
    const res = await getPreguntasBySeccion(idSeccion);
    const resJson = await res?.json();
    setPreguntas(resJson);
    setLoading(false);
  }

  useState(() => {
    llenarPreguntas();
  }, []);

  return (
    <PreguntaCreatorContainer>
      <ControlsContainer>
        <WhiteIconButton onClick={() => setShowForm(true)}><i className="fa-solid fa-plus"></i></WhiteIconButton>
        <DeleteContainer>
          <PSelected>1 selected</PSelected>
          <DangerIconButton><i className="fa-solid fa-trash-can"></i></DangerIconButton>
        </DeleteContainer>
        {
          showForm &&
          <Modal titulo="Añadir pregunta" cerrar={() => setShowForm(false)}>
            <ModalPregunta
              actualizar={() => {
                llenarPreguntas();
                setShowForm(false);
              }}
              funcion="añadir"
              idSeccion={idSeccion}
            />
          </Modal>
        }
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
            {
              loading? (
                <TrCargando>
                  <TdCargando>
                    <Cargando />
                  </TdCargando>
                </TrCargando>
              ) : (
                <>
                  {
                    preguntas.filter((v, i) => i >= (preguntasPage - 1) * 8 && i < preguntasPage * 8).map((v, i) => (
                      <PreguntaCard key={i} {...v} index={((preguntasPage - 1) * 8) + (i + 1)} llenarPreguntas={llenarPreguntas}/>
                    ))
                  }
                </>
              )
            }
          </tbody>
        </TablePreguntas>
      </TableContainer>
      <PaginationContainer>
        <PaginationCounter>
          {((preguntasPage - 1) * 8) + 1}-{preguntasPage * 8 > preguntas.length? preguntas.length : preguntasPage * 8} de {preguntas.length}
        </PaginationCounter>
        <ChangePageContainer>
          <RowsPage>Filas por pagina: 8</RowsPage>
          <ButtonPagContainer>
            <ButtonChange onClick={() => preguntasPage != 1 && setPreguntasPage(preguntasPage - 1)}>
              <i className="fa-solid fa-arrow-left"></i>
            </ButtonChange>
            <RowsPage>{preguntasPage}/{Math.ceil(preguntas.length / 8)}</RowsPage>
            <ButtonChange onClick={() => preguntasPage != Math.ceil(preguntas.length / 8) && setPreguntasPage(preguntasPage + 1)}>
              <i className="fa-solid fa-arrow-right"></i>
            </ButtonChange>
          </ButtonPagContainer>
        </ChangePageContainer>
      </PaginationContainer>
    </PreguntaCreatorContainer>
  )
}

export default PreguntaCreator;