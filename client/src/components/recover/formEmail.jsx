import React from 'react'
import { ErrorCss } from '../../styles/globals/formularios';
import { DivInputBox, DivInputs, IInput, InputText, Instructions, SpanText } from '../../styles/pages/login';

const FormEmail = ({ form, errors, handleChange }) => {
  let data = [
    {
      name: "email",
      value: form.email,
      placeholder: "Correo",
      error: errors.email,
    },
  ];

  return (
    <>
    <Instructions>Escribe el correo asociado a tu cuenta y te enviaremos un código.</Instructions>
    {
      data.map((v, i) => (
        <DivInputs key={i}>
          <DivInputBox>
            <InputText
              required
              type="text"
              name={v.name}
              onChange={handleChange}
              value={v.value}
            />
            <SpanText>{v.placeholder}</SpanText>
            <IInput></IInput>
          </DivInputBox>
          {v.error && <ErrorCss>{v.error}</ErrorCss>}
        </DivInputs>
      ))
    }
    </>
  )
}

export default FormEmail