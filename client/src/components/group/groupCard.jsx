import React from "react";
import patronGrupo from '../../assets/grupo/patrongrupo.jpg';
import ModalGroup from "./modalGroup";
import { ableGrupo, updateGrupo } from '../../services/grupo';
import { useModal } from "../../hooks/useModal";
import { ButtonGroup, DivGroupCard, DivInfo, ImgGroup, PDesc, PText } from "../../styles/pages/group";

const GroupCard = (props) => {
  const cambiarHabilitado = async (id) => {
    const res = await ableGrupo(id);
    const resJson = await res?.json();
    if ((resJson.mensaje = "se actualizo correctamente")) {
      console.log("Se eliminó el grupo correctamente");
      props.llenarGrupos();
    }
  }

  const { openModal, closeModal } = useModal(
    "Editar grupo",
    <ModalGroup 
      call={updateGrupo}
      actualizar={() => {
        props.llenarGrupos();
        closeModal();
      }}
      id_docente={props.id_docente}
      funcion="editar"
      group={props}
    />
  )

  return (
    <DivGroupCard>
      <ImgGroup src={patronGrupo}/>
      <DivInfo>
        <PText>{props.titulo}</PText>
        <PDesc>{props.descripcion}</PDesc>
        <div>
          <ButtonGroup onClick={openModal}>Editar</ButtonGroup>
          <ButtonGroup onClick={() => cambiarHabilitado(props.id)}>Eliminar</ButtonGroup>
        </div>
      </DivInfo>
    </DivGroupCard>
  )
}

export default GroupCard;