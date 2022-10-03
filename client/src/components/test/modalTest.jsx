import React, { useEffect } from "react";
import styled from "styled-components";
import { FormContainer, DivInput, DivText, PText, InputText, InputSelect, ErrorCss, PurpleButton, WhiteButton } from "../../styles/formularios";
import { initialForm, validationsForm } from "../../validations/test";
import { UseForm } from "../../hooks/useFormTest";

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
        {
          data.map((v, i) => (
            <DivInput key={i}>
              <DivText>
                <PText>{v.placeholder}</PText>
                {v.error && <ErrorCss>{v.error}</ErrorCss>}
              </DivText>
              <InputText 
                name={v.name}
                value={v.value}
                onChange={ handleChange }
                disabled={v.disabled}
              />
            </DivInput>
          ))
        }
        <PurpleButton onClick={ handleSubmit }>{funcion}</PurpleButton>
    </FormContainer>
  )
}

export default ModalTest;