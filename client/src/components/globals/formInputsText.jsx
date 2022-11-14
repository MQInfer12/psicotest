import React from "react";
import { DivInput, DivText, PText, InputText, ErrorCss } from "../../styles/globals/formularios";

const FormInputsText = ({ data, handleChange }) => {
  return (
    <>
      {
        data.map((v, i) => (
        <DivInput key={i}>
          <DivText>
            <PText>{v.placeholder}</PText>
            {v.error && <ErrorCss>{v.error}</ErrorCss>}
          </DivText>
          <InputText center={v.center}
            name={v.name}
            type={v.tipo}
            value={v.value}
            onChange={ handleChange }
            disabled={v.disabled}
          />
        </DivInput>
        )) 
      }
    </>
  )
}

export default FormInputsText;