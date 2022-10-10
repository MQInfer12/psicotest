import React from "react";
import styled from "styled-components";
import { PurpleButton, WhiteButton, DangerButton, WhiteIconButton } from "../../../styles/formularios";
import { addSeccion, deleteSeccion } from "../../../services/seccion";

const SeccionCreatorDash = styled.div`
  width: 263px;
  height: 100%;
  border-left: 1px solid #D9D9D9;
  border-right: 1px solid #D9D9D9;
  display: flex;
  flex-direction: column;
`;

const DashPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #D9D9D9;
  padding: 20px;
`;

const DashTitle = styled.h3`
  color: #3E435D;
  font-size: 20px;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const SeccionSidebar = ({ test, seccion, index, llenarSecciones, seccionState, editState }) => {

  const añadirSeccion = async () => {
    const res = await addSeccion(test.id);
    const resJson = await res?.json();
    if(resJson.mensaje == "se guardo correctamente") {
      console.log("Se creó una nueva sección");
      llenarSecciones();
    }
  }

  const eliminarSeccion = async () => {
    const res = await deleteSeccion(seccion.id);
    const resJson = await res?.json();
    if(resJson) {
      console.log("Se eliminó la sección");
      llenarSecciones();
    }
  }

  return (
    <SeccionCreatorDash>
      <DashPart>
        <DashTitle>{test.nombre}</DashTitle>
        <DashTitle>Sección {index}</DashTitle>
        <ButtonContainer>
          <WhiteIconButton onClick={() => seccionState.seccionActual != 0 && seccionState.setSeccionActual(seccionState.seccionActual - 1)}>
            <i className="fa-solid fa-angle-left"></i>
          </WhiteIconButton>
          {
            seccion?
            <DangerButton onClick={eliminarSeccion}>Eliminar Sección</DangerButton>
            :
            <PurpleButton onClick={añadirSeccion}>Crear Sección</PurpleButton>
          }
          <WhiteIconButton onClick={() => index != "nueva" && seccionState.setSeccionActual(seccionState.seccionActual + 1)}>
            <i className="fa-solid fa-angle-right"></i>
          </WhiteIconButton>
        </ButtonContainer>
      </DashPart>
      <DashPart>
        {
          editState.editActual == "0"? (
            <>
              <PurpleButton onClick={() => editState.setEditActual(0)}>Preguntas</PurpleButton>
              <WhiteButton onClick={() => editState.setEditActual(1)}>Reactivos</WhiteButton>
            </>
          ) : (
            <>
              <WhiteButton onClick={() => editState.setEditActual(0)}>Preguntas</WhiteButton>
              <PurpleButton onClick={() => editState.setEditActual(1)}>Reactivos</PurpleButton>
            </>
          )
        }
      </DashPart>
    </SeccionCreatorDash>
  )
}

export default SeccionSidebar;