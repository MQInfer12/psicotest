import React from "react";
import styled from "styled-components";
import { PurpleButton, WhiteButton, DangerButton } from "../../styles/formularios";
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
  padding: 40px 20px;
`;

const SeccionCreator = ({ idTest, seccion, index, max, llenarSecciones, actualState }) => {

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
        <h3>Sección {index}</h3>
        {
          seccion?
          <DangerButton onClick={eliminarSeccion}>Eliminar Sección</DangerButton>
          :
          <PurpleButton onClick={añadirSeccion}>Crear Sección</PurpleButton>
        }
        <WhiteButton 
          onClick={() => {
            if(actualState.seccionActual != 0) {
              actualState.setSeccionActual(actualState.seccionActual - 1)
            }
          }}
        >Anterior</WhiteButton>
        <WhiteButton 
          onClick={() => {
            if(index != "nueva") {
              actualState.setSeccionActual(actualState.seccionActual + 1)
            }
          }}
        >Siguiente</WhiteButton>
      </DashPart>
      <DashPart>
        <WhiteButton>Preguntas</WhiteButton>
        <WhiteButton>Reactivos</WhiteButton>
      </DashPart>
    </SeccionCreatorDash>
  )
}

export default SeccionCreator;