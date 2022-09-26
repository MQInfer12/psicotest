import React, { useState } from "react";
import styled from "styled-components";
import patronGrupo from '../../images/patrongrupo.jpg';
import Modal from "../globals/modal";
import ModalGroup from "./modalGroup";

const DivGroupCard = styled.div`
  border-radius: 20px;
  width: 350px;
  height: 200px;
  background-color: #e0e0e0;
  overflow: hidden;
`;

const ImgGroup = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
`;

const DivInfo = styled.div`
  width: 100%;
  height: 120px;
  padding: 5px;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
`;

const PText = styled.p`
  font-size: 1rem;
`;

const ButtonGroup = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const GroupCard = (props) => {
  const [ showForm, setShowForm ] = useState(false);

  return (
    <DivGroupCard>
      <ImgGroup src={patronGrupo}/>
      <DivInfo>
        <PText>{props.titulo}</PText>
        <PText>{props.descripcion}</PText>
        <div>
          <ButtonGroup onClick={() => setShowForm(true)}>E</ButtonGroup>
          <ButtonGroup>B</ButtonGroup>
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