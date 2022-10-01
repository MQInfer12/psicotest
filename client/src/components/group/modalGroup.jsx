import React, { useEffect } from 'react';
import { initialForm, validationsForm } from '../../validations/group';
import { UseForm } from '../../hooks/useFormGroup';
import { FormContainer, DivInput, PText, InputText, ErrorCss, PurpleButton } from "../../styles/formularios";

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
      {data.map((v, i) => (
        <DivInput key={i}> 
          <PText>{v.placeholder}</PText>
          <InputText 
            type="text"
            name={v.name} 
            value={v.value}
            onChange={ handleChange }
          />
          {v.size && <small>{sizeTitle}/{v.size}</small>}
          {v.error && <ErrorCss>{v.error}</ErrorCss>}
        </DivInput>
      ))}
      <PurpleButton onClick={ handleSubmit }>{funcion}</PurpleButton>
    </FormContainer>
  )
}

export default ModalGroup;