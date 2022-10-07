import React from "react";
import { DivInput, DivText, PText, InputSelect, ErrorCss } from "../../styles/formularios";

const FormInputsSelect = ({ data, handleChange }) => {
  return (
    <>
      {
        data.map((v, i) => (
        <DivInput key={i}>
          <DivText>
            <PText>{v.select}</PText>
            {v.error && <ErrorCss>{v.error}</ErrorCss>}
          </DivText>
          <InputSelect
            name={v.select}
            onChange={handleChange}
            defaultValue={v.seleccionado}
            disabled={v.disabled}
          >
            {v.data.map((va, i) => (
              <option key={i} value={va.value}>
                {va.nombre}
              </option>
            ))}
          </InputSelect>
        </DivInput>
        )) 
      }
    </>
  )
}

export default FormInputsSelect;