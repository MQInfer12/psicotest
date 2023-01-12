import React, { useState } from 'react'
import { updatePreguntaDimensions } from '../../../services/dimension';
import { DivInput, DivSeparador, DivText, FormContainer, PText, PurpleButton } from '../../../styles/globals/formularios'
import { CheckboxInput } from '../../../styles/pages/testCreator'

const ModalAsignarPregunta = ({ secciones, dimension, setDimensiones, cerrar }) => {
  const [marcadas, setMarcadas] = useState(dimension.preguntas);

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

  const handleSubmit = async () => {
    const res = await updatePreguntaDimensions(marcadas, dimension.id);
    if(res.ok) {
      const resJson = await res?.json();
      setDimensiones(old => {
        let newOld = [...old];
        newOld = newOld.map(dim => {
          if(dim.id === dimension.id) {
            dim.preguntas = resJson.data.preguntas;
            dim.valores = resJson.data.natural;
          }
          return dim;
        });
        return newOld;
      });
      cerrar();
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
      <PurpleButton onClick={handleSubmit}>Guardar</PurpleButton>
    </FormContainer>
  )
}

export default ModalAsignarPregunta