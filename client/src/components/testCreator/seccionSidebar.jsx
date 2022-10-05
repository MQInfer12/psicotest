import React from "react";
import styled from "styled-components";
import { PurpleButton, WhiteButton, DangerButton, WhiteIconButton } from "../../styles/formularios";
import { addSeccion, deleteSeccion } from "../../services/seccion";

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

const SeccionSidebar = ({ test, idTest, seccion, index, llenarSecciones, actualState }) => {
  
  const añadirSeccion = async () => {
    const res = await addSeccion(idTest);
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
          <WhiteIconButton onClick={() => actualState.seccionActual != 0 && actualState.setSeccionActual(actualState.seccionActual - 1)}>
            <i className="fa-solid fa-angle-left"></i>
          </WhiteIconButton>
          {
            seccion?
            <DangerButton onClick={eliminarSeccion}>Eliminar Sección</DangerButton>
            :
            <PurpleButton onClick={añadirSeccion}>Crear Sección</PurpleButton>
          }
          <WhiteIconButton onClick={() => index != "nueva" && actualState.setSeccionActual(actualState.seccionActual + 1)}>
            <i className="fa-solid fa-angle-right"></i>
          </WhiteIconButton>
        </ButtonContainer>
      </DashPart>
      <DashPart>
        <WhiteButton>Preguntas</WhiteButton>
        <WhiteButton>Reactivos</WhiteButton>
      </DashPart>
    </SeccionCreatorDash>
  )
}

export default SeccionSidebar;