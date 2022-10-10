import React, { useState } from "react";
import styled from "styled-components";
import { DangerIconButton, WhiteIconButton } from "../../../styles/formularios";
import Modal from "../../globals/modal";
import ModalReactivo from "./modalReactivo";
import { deleteReactivo } from "../../../services/reactivo";

const ThReactivo = styled.th`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: start;
  color: #464F60;
  position: relative;
  transition: all 0.2s;

  &:hover {
    & > p {
      background-color: #FFFFFF;
    }

    & > div {
      transform: translateY(-40px);
    }
  }
`;

const PText = styled.p`
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
`;

const ReactivoCard = (props) => {
  const [showForm, setShowForm] = useState(false);

  const borrarReactivo = async () => {
    const res = await deleteReactivo(props.id);
    const resJson = await res?.json();
    if(resJson) {
      console.log("Se borro correctamente");
      props.llenarReactivos();
    }
  }

  return (
    <ThReactivo>
      <PText>
        {props.descripcion}
      </PText>
      <DivButtonsTd>
        <WhiteIconButton onClick={() => setShowForm(true)}><i className="fa-solid fa-pencil"></i></WhiteIconButton>
        <DangerIconButton onClick={borrarReactivo}><i className="fa-solid fa-trash-can"></i></DangerIconButton>
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
  )
}

export default ReactivoCard;