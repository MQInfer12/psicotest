import React from "react";
import { DivInput, DivText, PText, InputText, ErrorCss } from "../../styles/formularios";

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
          <InputText 
            name={v.name}
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