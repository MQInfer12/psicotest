import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DangerIconButton, WhiteIconButton } from "../../../styles/formularios";
import Modal from "../../globals/modal";
import ModalReactivo from "./modalReactivo";

const ThReactivo = styled.th`
  padding-left: 11px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: start;
  color: #464F60;
  position: relative;
  overflow: hidden;
  transition: all 0.2s;

  flex-grow: 1;

  &:hover {
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

const ReactivoCard = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    props.selecteds.includes(props.id)? setSelected(true) : setSelected(false);
  })

  return (
    <>
    <ThReactivo>
        {props.descripcion}
        <DivButtonsTd>
          <WhiteIconButton onClick={() => setShowForm(true)}><i className="fa-solid fa-pencil"></i></WhiteIconButton>
          { /* BOTON PARA IR MARCANDO LAS PREGUNTAS */}
          <DangerIconButton><i className="fa-solid fa-trash-can"></i></DangerIconButton>
        </DivButtonsTd>
        {
          showForm &&
          <Modal titulo="Editar reactivo" cerrar={() => setShowForm(false)} >
            <ModalReactivo 
              actualizar={() => {
                props.llenarReactivos();
                setShowForm(false);
              }}
              funcion="editar"
              reactivo={props}
              idSeccion={props.id_seccion}
            />
          </Modal>
        }
    </ThReactivo>
    </>
  )
}

export default ReactivoCard;