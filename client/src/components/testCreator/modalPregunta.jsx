import React, { useEffect } from "react";
import { FormContainer, PurpleButton } from "../../styles/formularios";
import FormInputsText from "../globals/formInputsText";
import { initialForm, validationsForm } from "../../validations/pregunta";
import { UseForm } from "../../hooks/useFormPregunta";

const ModalPregunta = ({ pregunta, actualizar, funcion, idSeccion }) => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleFill
  } = UseForm(initialForm, validationsForm, actualizar, funcion, pregunta?.id, idSeccion)

  useEffect(() => {
    pregunta && handleFill(pregunta);
  }, []);
  
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

export default ModalPregunta;