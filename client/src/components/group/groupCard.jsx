import React, { useState } from "react";
import styled from "styled-components";
import patronGrupo from '../../images/patrongrupo.jpg';
import Modal from "../globals/modal";
import ModalGroup from "./modalGroup";
import { ableGrupo } from '../../services/grupo';

const DivGroupCard = styled.div`
  border-radius: 20px;
  width: 350px;
  height: 200px;
  background-color: #e0e0e0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ImgGroup = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
`;

const DivInfo = styled.div`
  width: 100%;
  height: 120px;
  padding: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  white-space: nowrap;
`;

const PText = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

const PDesc = styled.p`
  width: 100%;
  font-size: 0.9rem;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonGroup = styled.button`
  width: 100px;
  height: 30px;
  cursor: pointer;
`;

const GroupCard = (props) => {
  const [ showForm, setShowForm ] = useState(false);

  const cambiarHabilitado = async (id) => {
    const res = await ableGrupo(id);
    const resJson = await res?.json();
    if ((resJson.mensaje = "se actualizo correctamente")) {
      console.log("Se eliminó el grupo correctamente");
      props.llenarGrupos();
    }
  }

  return (
    <DivGroupCard>
      <ImgGroup src={patronGrupo}/>
      <DivInfo>
        <PText>{props.titulo}</PText>
        <PDesc>{props.descripcion}</PDesc>
        <div>
          <ButtonGroup onClick={() => setShowForm(true)}>Editar</ButtonGroup>
          <ButtonGroup onClick={() => cambiarHabilitado(props.id)}>Eliminar</ButtonGroup>
        </div>
      </DivInfo>
      {showForm && 
        <Modal cerrar={() => setShowForm(false)}>
          <ModalGroup 
            actualizar={() => {
              props.llenarGrupos();
              setShowForm(false);
            }}
            id_docente={props.id_docente}
            funcion="editar"
            group={props}
          />
        </Modal>
      }
    </DivGroupCard>
  )
}

export default GroupCard;