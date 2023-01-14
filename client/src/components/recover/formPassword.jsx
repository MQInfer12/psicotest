import React from 'react'
import { ErrorCss } from '../../styles/globals/formularios';
import { DivInputBox, DivInputs, IInput, InputText, Instructions, SpanText } from '../../styles/pages/login';

const FormPassword = ({ form, errors, handleChange }) => {
  let data = [
    {
      name: "password",
      value: form.password,
      placeholder: "Contraseña",
      error: errors.password,
    },
    {
      name: "passwordRepeat",
      value: form.passwordRepeat,
      placeholder: "Repetir contraseña",
      error: errors.passwordRepeat,
    },
  ];

  return (
    <>
    <Instructions>Escribe aquí tu nueva contraseña.</Instructions>
    {
      data.map((v, i) => (
        <DivInputs key={i}>
          <DivInputBox>
            <InputText
              required
              type="password"
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

export default FormPassword