import React, { useState } from "react";
import styled from "styled-components";
import { DangerIconButton, WhiteIconButton } from "../../../styles/formularios";
import Cargando from "../../globals/cargando";
import { getReactivosBySeccion } from "../../../services/reactivo";
import Modal from "../../globals/modal";
import Pagination from "../pagination";
import ModalReactivo from "./modalReactivo";
import ReactivoCard from "./reactivoCard";

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

  & > thead > tr > th {
    display: flex;
    align-items: center;
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

const TrHead = styled.tr`
  display: grid;
  grid-template-columns: 47px repeat(${props => props.cant}, 1fr);
  align-items: center;
  width: 100%;
  height: 40px;
`;

const ThNumberal = styled.th`
  font-size: 11px;
  color: #171C26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
  font-weight: 600;
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

const ReactivoCreator = ({ idSeccion }) => {
  const [reactivos, setReactivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [reactivosPage, setReactivosPage] = useState(1);
  const [selecteds, setSelecteds] = useState([]);

  const llenarReactivos = async () => {
    const res = await getReactivosBySeccion(idSeccion);
    const resJson = await res?.json();
    console.log(resJson);
    setReactivos(resJson);
    setLoading(false);
  }

  useState(() => {
    llenarReactivos();
  }, []);

  return (
    <PreguntaCreatorContainer>
      <ControlsContainer>
        <WhiteIconButton onClick={() => setShowForm(true)}><i className="fa-solid fa-plus"></i></WhiteIconButton>
        {
          showForm &&
          <Modal titulo="Añadir reactivo" cerrar={() => setShowForm(false)}>
            <ModalReactivo
              actualizar={() => {
                llenarReactivos();
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
            <TrHead cant={reactivos.length}>
              <ThNumberal>#</ThNumberal>
              {
                reactivos.filter((v, i) => i >= (reactivosPage - 1) * 8 && i < reactivosPage * 8).map((v, i) => (
                  <ReactivoCard 
                    key={i} 
                    {...v} 
                    index={((reactivosPage - 1) * 8) + (i + 1)} 
                    llenarReactivos={llenarReactivos}
                    selecteds={selecteds}
                    setSelecteds={setSelecteds}
                  />
                ))
              }
            </TrHead>
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
                  {/*
                    reactivos.filter((v, i) => i >= (reactivosPage - 1) * 8 && i < reactivosPage * 8).map((v, i) => (
                      <ReactivoCard 
                        key={i} 
                        {...v} 
                        index={((reactivosPage - 1) * 8) + (i + 1)} 
                        llenarReactivos={llenarReactivos}
                        selecteds={selecteds}
                        setSelecteds={setSelecteds}
                      />
                    ))
                    */}
                </>
              )
            }
          </tbody>
        </TablePreguntas>
      </TableContainer>
      <Pagination 
        cant={reactivos.length}
        rows={8}
        page={reactivosPage}
        setPage={setReactivosPage}
      />
    </PreguntaCreatorContainer>
  )
}

export default ReactivoCreator;