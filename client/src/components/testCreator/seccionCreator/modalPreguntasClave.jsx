import React, { useState } from 'react'
import { DivInput, DivSeparador, DivText, FormContainer, PText, PurpleButton } from '../../../styles/globals/formularios'
import { CheckboxInput } from '../../../styles/pages/testCreator'

const ModalPreguntasClave = ({ secciones, cerrar }) => {
  const [marcadas, setMarcadas] = useState([]);

  const handleChange = (id) => {
    if(marcadas.includes(id)) {
      setMarcadas(old => {
        return old.filter(marcada => marcada != id);
      });
    } else {
      setMarcadas(old => {
        return [...old, id];
      });
    }
  }

  return (
    <FormContainer>
      <DivInput maxheight="400px">
        {
          secciones.map((seccion, i) => (
            <DivSeparador key={i}>
              <PText titulo>{seccion.nombre}</PText>
              {
                seccion.preguntas.map((pregunta, j) => (
                  <DivText key={j} padding="0 10px">
                    <PText>
                      <span className='bolder'>Pregunta {j + 1}: </span>
                      <span className='lighter'>{pregunta.descripcion}</span>
                    </PText>
                    <CheckboxInput 
                      type="checkbox"
                      disabled={marcadas.length === 5 && !marcadas.includes(pregunta.id)} 
                      checked={marcadas.includes(pregunta.id)} 
                      onChange={() => handleChange(pregunta.id)}
                    />
                  </DivText>
                ))
              }
            </DivSeparador>
          ))
        }
      </DivInput>
      <PurpleButton onClick={cerrar}>Guardar</PurpleButton>
    </FormContainer>
  )
}

export default ModalPreguntasClave