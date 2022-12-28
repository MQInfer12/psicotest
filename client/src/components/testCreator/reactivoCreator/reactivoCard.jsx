import React from "react";
import { DangerIconButton, WhiteIconButton } from "../../../styles/globals/formularios";
import ModalReactivo from "./modalReactivo";
import { deleteReactivo, updateReactivo } from "../../../services/reactivo";
import SureModal from "../../globals/sureModal";
import { useModal } from "../../../hooks/useModal";
import { DivReactivoButtonsTd, PText, ThReactivo } from "../../../styles/pages/testCreator";

const ReactivoCard = (props) => {
  const borrarReactivo = async () => {
    const res = await deleteReactivo(props.id);
    const resJson = await res?.json();
    if(resJson) {
      console.log("Se borro correctamente");
      props.llenarSeccion();
    }
  }

  const { openModal: openEdit, closeModal: closeEdit } = useModal(
    "Editar reactivo",
    <ModalReactivo 
      call={updateReactivo}
      actualizar={() => {
        props.llenarSeccion();
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
      <DivReactivoButtonsTd>
        <WhiteIconButton title="Editar reactivo" onClick={openEdit}><i className="fa-solid fa-pencil"></i></WhiteIconButton>
        <DangerIconButton title="Eliminar reactivo" onClick={openDelete}><i className="fa-solid fa-trash-can"></i></DangerIconButton>
      </DivReactivoButtonsTd>
    </ThReactivo>
  )
}

export default ReactivoCard;