import React, { useEffect } from 'react';
import { initialForm, validationsForm } from '../../validations/group';
import { UseForm } from '../../hooks/useFormGroup';
import { FormContainer, PurpleButton } from "../../styles/formularios";
import FormInputsText from '../globals/formInputsText';

const ModalGroup = ({ actualizar, id_docente, funcion, group }) => {
  
  const {
    form,
    errors,
    sizeTitle,
    handleChange,
    handleSubmit,
    handleFill,
  } = UseForm(initialForm, validationsForm, actualizar, funcion, group?.id, id_docente);

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

  useEffect(() => {
    if(group != undefined) {
      handleFill(group, id_docente);
    }
  }, [])

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