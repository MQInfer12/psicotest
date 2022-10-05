import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { WhiteIconButton } from "../../styles/formularios";
import Modal from "../globals/modal";
import ModalPregunta from "./modalPregunta";

const ThNumber = styled.th`
  font-size: 14px;
  font-weight: 500;
  color: #171C26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
`;

const TdPregunta = styled.td`
  max-width: 575px;
  color: #464F60;
  font-weight: 400;
  font-size: 14px;
  text-align: start;
  white-space: nowrap;
  padding-right: 20px;
  transition: all 0.3s;
  position: relative;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    padding-right: 120px;

    & > div {
      transform: translateX(0);
    }
  }
`;

const DivButtonsTd = styled.div`
  height: 100%;
  padding-right: 10px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100px);
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
`;

const PreguntaCard = (props) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
    {
      showForm &&
      <Modal titulo="Editar pregunta" cerrar={() => setShowForm(false)} >
        <ModalPregunta 
          actualizar={() => {
            props.llenarPreguntas();
            setShowForm(false);
          }}
          funcion="editar"
          pregunta={props}
          idSeccion={props.id_seccion}
        />
      </Modal>
    }
    <tr>
      <ThNumber>{props.index}</ThNumber>
      <TdPregunta>
        <p>{props.descripcion}</p>
        <DivButtonsTd>
          <WhiteIconButton onClick={() => setShowForm(true)}><i className="fa-solid fa-pencil"></i></WhiteIconButton>
          <WhiteIconButton><i className="fa-solid fa-info"></i></WhiteIconButton>
        </DivButtonsTd>
      </TdPregunta>
    </tr>
    </>
  )
}

export default PreguntaCard;