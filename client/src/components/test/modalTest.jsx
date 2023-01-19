import React from "react";
import { FormContainer, PurpleButton } from "../../styles/globals/formularios";
import { initialForm, validationsForm } from "../../validations/test";
import { UseForm } from "../../hooks/useForm";
import FormInputsText from "../globals/formInputsText";
import { useUserContext } from "../../context/userContext";

const ModalTest = ({ funcion, call, actualizar, test }) => {
  const { user } = useUserContext();

  const { form, errors, handleChange, handleSubmit} = UseForm(
    test ? {
      nombre: test.nombre,
      descripcion: test.descripcion,
      tiempo: test.tiempo
    } : initialForm, 
    validationsForm,
    call,
    actualizar,
    test?.id_test,
    user.id
  );

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
      name: "tiempo",
      value: form.tiempo,
      placeholder: "Tiempo aproximado",
      error: errors.tiempo,
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

export default ModalTest;