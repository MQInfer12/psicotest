import React from "react";
import { FormContainer, PurpleButton } from "../../../styles/globals/formularios";
import FormInputsText from "../../globals/formInputsText";
import { UseForm } from "../../../hooks/useForm";
import { validationsForm } from "../../../validations/seccion";
import { updateSeccion } from "../../../services/seccion";

const ModalSeccion = ({ seccion, actualizar }) => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit
  } = UseForm(
    {
      nombre: seccion.nombre,
      instruccion: seccion.instruccion
    },
    validationsForm, 
    updateSeccion, 
    actualizar,
    seccion.id
  )
  
  const data = [
    {
      name: "nombre",
      placeholder: "Nombre",
      error: errors.nombre,
      value: form.nombre,
      type: "text",
      disabled: false
    },
    {
      name: "instruccion",
      placeholder: "Instrucción",
      error: errors.instruccion,
      value: form.instruccion,
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
      <PurpleButton onClick={handleSubmit}>Editar</PurpleButton>
    </FormContainer>
  )
}

export default ModalSeccion;