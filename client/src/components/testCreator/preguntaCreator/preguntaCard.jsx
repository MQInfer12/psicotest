import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { WhiteIconButton } from "../../../styles/formularios";
import { updatePregunta } from "../../../services/pregunta";
import Modal from "../../globals/modal";
import ModalPregunta from "./modalPregunta";
import { 
  ResponsiveTr, ThNumber, DivDouble, PLight
} from "../../../styles/table";

const PreguntaCard = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    props.selecteds.includes(props.id)? setSelected(true) : setSelected(false);
  })

  return (
    <ResponsiveTr 
      inTestCreator
      selectedPregunta={selected}
      rowHeight={props.rowHeight}
    >
      <ThNumber>{props.index}</ThNumber>
      <td>
        <DivDouble>
          <PLight>{props.descripcion}</PLight>
        </DivDouble>
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
              call={updatePregunta}
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
      </td>
    </ResponsiveTr>
  )
}

export default PreguntaCard;

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