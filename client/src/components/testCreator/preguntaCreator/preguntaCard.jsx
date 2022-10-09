import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { WhiteIconButton } from "../../../styles/formularios";
import Modal from "../../globals/modal";
import ModalPregunta from "./modalPregunta";

const PreguntaRow = styled.tr`
  filter: ${props => props.selected && "opacity(0.5)"};
  transition: all 0.2s;

  &:hover > td {
    padding-right: 120px;

    & > div {
      transform: translateX(0);
    }
  }
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
  max-width: 575px;
  color: #464F60;
  font-weight: 400;
  font-size: 14px;
  text-align: start;
  white-space: nowrap;
  padding-right: 20px;
  transition: all 0.3s;
  position: relative;
`;

const PPregunta = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
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
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    props.selecteds.includes(props.id)? setSelected(true) : setSelected(false);
  })

  return (
    <PreguntaRow 
      selected={selected}
    >
      <ThNumber>{props.index}</ThNumber>
      <TdPregunta>
        <PPregunta>{props.descripcion}</PPregunta>
        <DivButtonsTd>
          <WhiteIconButton onClick={() => setShowForm(true)}><i className="fa-solid fa-pencil"></i></WhiteIconButton>
          { /* BOTON PARA IR MARCANDO LAS PREGUNTAS */}
          <WhiteIconButton 
            onClick={() => {
              if(!props.selecteds.includes(props.id)) {
                props.setSelecteds(old => [...old, props.id]);
                setSelected(true);
              } else {
                props.setSelecteds(old => old.filter(value => value != props.id));
                setSelected(false);
              }
            }}
          >
            {
              selected? (
                <i className="fa-solid fa-square-check"></i>
              ) : (
                <i className="fa-regular fa-square-check"></i>
              )
            }
          </WhiteIconButton>
        </DivButtonsTd>
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
      </TdPregunta>
    </PreguntaRow>
  )
}

export default PreguntaCard;