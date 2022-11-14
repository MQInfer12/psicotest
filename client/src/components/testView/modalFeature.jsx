import React from "react";
import { FormContainer, PurpleButton } from "../../styles/globals/formularios";
import { UseForm } from "../../hooks/useForm";
import { initialForm, validationsForm } from "../../validations/feature";
import FormInputsText from "../globals/formInputsText";

const ModalFeature = ({ funcion, call, actualizar, feature, idTest }) => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit
  } = UseForm(
    feature ? {
      titulo: feature.titulo,
      descripcion: feature.descripcion
    } : initialForm,
    validationsForm,
    call,
    actualizar,
    feature?.id,
    idTest
  );

  let data = [
    {
      name: "titulo",
      value: form.titulo,
      placeholder: "Titulo",
      error: errors.titulo,
      tipo: "text",
      disabled: false
    },
    {
      name: "descripcion",
      value: form.descripcion,
      placeholder: "Descripcion",
      error: errors.descripcion,
      tipo: "text",
      disabled: false
    },
  ]

  return (
    <FormContainer>
      <FormInputsText
        data={data}
        handleChange={ handleChange }
      />
      <PurpleButton onClick={ handleSubmit }>{funcion}</PurpleButton>
    </FormContainer>
  )
}

export default ModalFeature;