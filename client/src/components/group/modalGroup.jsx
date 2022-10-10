import React from 'react';
import { initialForm, validationsForm } from '../../validations/group';
import { UseForm } from '../../hooks/useForm';
import { FormContainer, PurpleButton } from "../../styles/formularios";
import FormInputsText from '../globals/formInputsText';

const ModalGroup = ({ call, actualizar, id_docente, funcion, group }) => {
  
  const {
    form,
    errors,
    //sizeTitle,
    handleChange,
    handleSubmit,
  } = UseForm(
    group? {
      titulo: group.titulo,
      descripcion: group.descripcion,
      id_docente: id_docente
    } : initialForm,
    validationsForm,
    call,
    actualizar,
    group?.id,
    id_docente
  );

  let data = [
    {
      name: "titulo",
      value: form.titulo,
      placeholder: "Titulo",
      error: errors.titulo,
      size: 22
    },
    {
      name: "descripcion",
      value: form.descripcion,
      placeholder: "Descripción",
      error: errors.descripcion
    },
  ];

  return (
    <FormContainer>
      <FormInputsText
        data={data}
        handleChange={handleChange}
      />
      <PurpleButton onClick={ handleSubmit }>{funcion}</PurpleButton>
    </FormContainer>
  )
}

export default ModalGroup;