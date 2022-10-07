import React, { useEffect } from "react";
import { FormContainer, PurpleButton } from "../../styles/formularios";
import FormInputsText from "../globals/formInputsText";
import { initialForm, validationsForm } from "../../validations/pregunta_reactivo";
import { UseForm } from "../../hooks/useFormReactivo";

const ModalReactivo = ({ reactivo, actualizar, funcion, idSeccion }) => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleFill
  } = UseForm(initialForm, validationsForm, actualizar, funcion, reactivo?.id, idSeccion)

  useEffect(() => {
    reactivo && handleFill(reactivo);
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

export default ModalReactivo;