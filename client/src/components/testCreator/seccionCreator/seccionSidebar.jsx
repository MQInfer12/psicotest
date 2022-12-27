import React from "react";
import { PurpleButton, WhiteButton, DangerButton, WhiteIconButton } from "../../../styles/globals/formularios";
import { addSeccion, changeMultimarcado, changeVacio, deleteSeccion } from "../../../services/seccion";
import SureModal from "../../globals/sureModal";
import { useModal } from "../../../hooks/useModal";
import { ButtonContainer, Checkbox, CheckboxDiv, DashPart, DashTitle, PCheckbox, SeccionCreatorDash } from "../../../styles/pages/testCreator";

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

  const handleMultimarcado = async () => {
    const res = await changeMultimarcado(seccion.id);
    if(res.ok) {
      console.log("Se cambió correctamente");
    }
  }

  const handleVacio = async () => {
    const res = await changeVacio(seccion.id);
    if(res.ok) {
      console.log("Se cambió correctamente");
    }
  }

  const { openModal, closeModal } = useModal(
    "Eliminar sección",
    <SureModal
      cerrar={() => closeModal()}
      sure={eliminarSeccion}
      text="Se eliminará esta sección permanentemente"
    />
  );

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
            <DangerButton onClick={openModal}>Eliminar Sección</DangerButton>
            :
            <PurpleButton onClick={añadirSeccion}>Crear Sección</PurpleButton>
          }
          <WhiteIconButton onClick={() => index != "nueva" && seccionState.setSeccionActual(seccionState.seccionActual + 1)}>
            <i className="fa-solid fa-angle-right"></i>
          </WhiteIconButton>
        </ButtonContainer>
      </DashPart>
      {
        seccion && 
        <DashPart>
          <CheckboxDiv>
            <Checkbox type="checkbox" defaultChecked={seccion.multimarcado} onClick={handleMultimarcado} /> 
            <PCheckbox>Multimarcado de reactivos</PCheckbox>
          </CheckboxDiv>
          <CheckboxDiv>
            <Checkbox type="checkbox" defaultChecked={seccion.vacio} onClick={handleVacio} /> 
            <PCheckbox>Aceptar respuestas vacías</PCheckbox>
          </CheckboxDiv>
        </DashPart>
      }
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