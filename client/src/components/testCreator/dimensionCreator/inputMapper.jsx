import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { PLight, ResponsiveTr } from '../../../styles/globals/table'
import { InputNumber } from '../../../styles/pages/testCreator'

const InputMapper = ({ valores, setValores }) => {
  const { setSaveConversiones } = useTestCreatorContext();

  const handleChange = (e, natural, id_escala_dimension) => {
    setValores(old => {
      return old.map(valor => {
        const newValor = {...valor};
        if(newValor.natural === natural) {
          newValor.conversiones = newValor.conversiones.map(conversion => {
            let newConversion = {...conversion};
            if(newConversion.id_escala_dimension === id_escala_dimension) {
              newConversion.convertido = e.target.value;
            }
            return newConversion;
          });
        }
        return newValor;
      });
    });
    setSaveConversiones(true);
  }

  return (
    valores?.map((valor, j) => (
      <ResponsiveTr key={j}>
        <td><PLight>{valor.natural}</PLight></td>
        {
          valor.conversiones.map((conversion, k) => (
            <td key={k}>
              <InputNumber
                type="number"
                value={conversion.convertido}
                placeholder="-"
                onChange={(e) => handleChange(e, valor.natural, conversion.id_escala_dimension)}
              />
            </td>
          ))
        }
      </ResponsiveTr>
    ))
  )
}

export default InputMapper