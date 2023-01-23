import React from 'react'
import { UseForm } from '../../../hooks/useForm'
import { changeConstante } from '../../../services/dimension'
import { FormContainer, PurpleButton } from '../../../styles/globals/formularios'
import { validationsForm } from '../../../validations/dimension'
import FormInputsText from '../../globals/formInputsText'

const ModalConstante = ({ dimension, actualizar }) => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit
  } = UseForm(
    {
      constante: String(dimension.constante)
    }, 
    validationsForm, 
    changeConstante, 
    actualizar,
    dimension.id
  )

  const data = [
    {
      name: "constante",
      placeholder: "Constante",
      error: errors.constante,
      value: form.constante,
      tipo: "number",
      disabled: false,
      center: true
    }
  ]

  return (
    <FormContainer>
      <FormInputsText 
        data={data}
        handleChange={handleChange}
      />
      <PurpleButton onClick={handleSubmit}>Asignar</PurpleButton>
    </FormContainer>
  )
}

export default ModalConstante