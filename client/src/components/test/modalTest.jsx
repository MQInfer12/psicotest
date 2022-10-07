import React, { useEffect } from "react";
import styled from "styled-components";
import { FormContainer, DivInput, DivText, PText, InputText, InputSelect, ErrorCss, PurpleButton, WhiteButton } from "../../styles/formularios";
import { initialForm, validationsForm } from "../../validations/test";
import { UseForm } from "../../hooks/useFormTest";
import FormInputsText from "../globals/formInputsText";

const ModalTest = ({ funcion, actualizar, test }) => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleFill
  } = UseForm(initialForm, validationsForm, actualizar, funcion, test?.id)

  const data = [
    {
      name: "nombre",
      value: form.nombre,
      placeholder: "Nombre",
      error: errors.nombre,
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
    {
      name: "autor",
      value: form.autor,
      placeholder: "Autor",
      error: errors.autor,
      tipo: "text",
      disabled: true
    },
    {
      name: "tiempo",
      value: form.tiempo,
      placeholder: "Tiempo",
      error: errors.tiempo,
      tipo: "text",
      disabled: false
    },
  ]

  useEffect(() => {
    test && handleFill(test);
  }, []);

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

export default ModalTest;