import React from "react";
import { FormContainer, PurpleButton } from "../../../styles/globals/formularios";
import FormInputsText from "../../globals/formInputsText";
import { initialForm, validationsForm } from "../../../validations/pregunta_reactivo";
import { UseForm } from "../../../hooks/useForm";

const ModalReactivo = ({ reactivo, call, actualizar, funcion, idSeccion }) => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit
  } = UseForm(
    reactivo? {
      id_seccion: idSeccion,
      descripcion: reactivo.descripcion
    } : initialForm, 
    validationsForm, 
    call, 
    actualizar, 
    reactivo?.id, 
    idSeccion
  )
  
  const data = [
    {
      name: "descripcion",
      placeholder: "Descripción",
      error: errors.descripcion,
      value: form.descripcion,
      type: "text",
      disabled: false
    }
  ]

  return (
    <FormContainer>
      <FormInputsText 
        data={data}
        handleChange={handleChange}
      />
      <PurpleButton onClick={handleSubmit}>{funcion}</PurpleButton>
    </FormContainer>
  )
}

export default ModalReactivo;