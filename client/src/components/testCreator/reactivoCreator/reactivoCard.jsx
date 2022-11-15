import React from "react";
import styled from "styled-components";
import { DangerIconButton, WhiteIconButton } from "../../../styles/globals/formularios";
import ModalReactivo from "./modalReactivo";
import { deleteReactivo, updateReactivo } from "../../../services/reactivo";
import SureModal from "../../globals/sureModal";
import { useModal } from "../../../hooks/useModal";

const ReactivoCard = (props) => {
  const borrarReactivo = async () => {
    const res = await deleteReactivo(props.id);
    const resJson = await res?.json();
    if(resJson) {
      console.log("Se borro correctamente");
      props.llenarReactivos();
    }
  }

  const { openModal: openEdit, closeModal: closeEdit } = useModal(
    "Editar reactivo",
    <ModalReactivo 
      call={updateReactivo}
      actualizar={() => {
        props.llenarReactivos();
        closeEdit();
      }}
      funcion="editar"
      reactivo={props}
      idSeccion={props.id_seccion}
    />
  )
  const { openModal: openDelete, closeModal: closeDelete } = useModal(
    "Eliminar reactivo",
    <SureModal
      cerrar={() => closeDelete()}
      sure={borrarReactivo}
      text="Se eliminará el reactivo permanentemente"
    />
  )

  return (
    <ThReactivo>
      <PText>
        {props.descripcion}
      </PText>
      <DivButtonsTd>
        <WhiteIconButton title="Editar reactivo" onClick={openEdit}><i className="fa-solid fa-pencil"></i></WhiteIconButton>
        <DangerIconButton title="Eliminar reactivo" onClick={openDelete}><i className="fa-solid fa-trash-can"></i></DangerIconButton>
      </DivButtonsTd>
    </ThReactivo>
  )
}

export default ReactivoCard;

const ThReactivo = styled.th`
  position: relative;
  font-weight: 400;
  transition: all 0.2s;

  &:hover {
    & > p {
      background-color: #FFFFFF;
    }

    & > div {
      opacity: 1;
      z-index: 1;
      transform: translateY(-40px);
    }
  }
`;

const PText = styled.p`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #EBF0FA;
  z-index: 1;
  transition: all 0.3s;
`;

const DivButtonsTd = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  z-index: -1;
  opacity: 0;
`;