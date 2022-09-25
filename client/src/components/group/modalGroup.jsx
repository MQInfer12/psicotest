import React from 'react';
import styled from 'styled-components';
import { initialForm, validationsForm } from '../../validations/group';
import { UseForm } from '../../hooks/useFormGroup';
import { DivInput, PText, InputText, ErrorCss, ButtonModal } from "../../styles/formularios";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const ModalGroup = ({ actualizar, id_docente, funcion }) => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit,
  } = UseForm(initialForm, validationsForm, actualizar, id_docente);

  let data = [
    {
      name: "titulo",
      value: form.titulo,
      placeholder: "Titulo",
      error: errors.titulo
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
      {data.map((v, i) => (
        <DivInput key={i}> 
          <PText>{v.placeholder}</PText>
          <InputText 
            type="text"
            name={v.name} 
            value={v.value}
            onChange={ handleChange }
          />
          {v.error && <ErrorCss>{v.error}</ErrorCss>}
        </DivInput>
      ))}
      <ButtonModal onClick={handleSubmit}>{funcion}</ButtonModal>
    </FormContainer>
  )
}

export default ModalGroup;