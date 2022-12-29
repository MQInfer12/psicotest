import React from 'react'
import { UseForm } from '../../../hooks/useForm'
import { changePredeterminado } from '../../../services/reactivo'
import { FormContainer, PurpleButton } from '../../../styles/globals/formularios'
import { validationsForm } from '../../../validations/puntuacion'
import FormInputsText from '../../globals/formInputsText'

const ModalPuntuacion = ({ actualizar, reactivo }) => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit
  } = UseForm(
    {
      predeterminado: reactivo.predeterminado
    }, 
    validationsForm, 
    changePredeterminado, 
    actualizar,
    reactivo.id
  )

  const data = [
    {
      name: "predeterminado",
      placeholder: "Predeterminado",
      error: errors.predeterminado,
      value: form.predeterminado,
      type: "number",
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

export default ModalPuntuacion