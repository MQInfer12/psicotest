import React, { useState } from "react";
import styled from "styled-components";
import { DangerIconButton, WhiteIconButton } from "../../../styles/formularios";
import Cargando from "../../globals/cargando";
import { getPreguntasBySeccion, massDestroy } from "../../../services/pregunta";
import Modal from "../../globals/modal";
import ModalPregunta from "./modalPregunta";
import PreguntaCard from "./preguntaCard";
import Pagination from "../pagination";

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
  padding: 0px 11px;
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
    height: 64px;
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
  background-color: #FFFFFF;
  display: flex;
  width: 622px;
  height: 512px;
`;

const PreguntaCreator = ({ idSeccion, preguntas, setPreguntas }) => {
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [preguntasPage, setPreguntasPage] = useState(1);
  const [selecteds, setSelecteds] = useState([]);

  const llenarPreguntas = async () => {
    const res = await getPreguntasBySeccion(idSeccion);
    const resJson = await res?.json();
    setPreguntas(resJson);
    setLoading(false);
  }

  const borrarPreguntas = async () => {
    const res = await massDestroy(selecteds);
    const resJson = await res?.json();
    if(resJson.mensaje = "se borro correctamente") {
      console.log("Se borraron las preguntas");
      llenarPreguntas();
      setSelecteds([]);
    }
  }

  useState(() => {
    llenarPreguntas();
  }, []);

  return (
    <PreguntaCreatorContainer>
      <ControlsContainer>
        <WhiteIconButton onClick={() => setShowForm(true)}><i className="fa-solid fa-plus"></i></WhiteIconButton>
        <DeleteContainer>
          <PSelected>{selecteds.length} selected</PSelected>
          <DangerIconButton onClick={borrarPreguntas}><i className="fa-solid fa-trash-can"></i></DangerIconButton>
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
                      <PreguntaCard 
                        key={i} 
                        {...v} 
                        index={((preguntasPage - 1) * 8) + (i + 1)} 
                        llenarPreguntas={llenarPreguntas}
                        selecteds={selecteds}
                        setSelecteds={setSelecteds}
                      />
                    ))
                  }
                </>
              )
            }
          </tbody>
        </TablePreguntas>
      </TableContainer>
      <Pagination 
        cant={preguntas.length}
        rows={8}
        page={preguntasPage}
        setPage={setPreguntasPage}
      />
    </PreguntaCreatorContainer>
  )
}

export default PreguntaCreator;