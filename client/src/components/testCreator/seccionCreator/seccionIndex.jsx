import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { DashIndex, Details, PreguntasList } from '../../../styles/pages/testCreator'

const SeccionIndex = () => {
  const { secciones } = useTestCreatorContext();

  return (
    <DashIndex noBorder>
      {
        Object.values(secciones).map((seccion, i) => (
          <Details key={i}>
            <summary>Sección {i + 1}</summary>
            <PreguntasList>
              {
                seccion.preguntas.map((pregunta, j) => (
                  <li key={j}>Pregunta {j + 1}</li>
                ))
              }
            </PreguntasList>
          </Details>
        ))
      }
    </DashIndex>
  )
}

export default SeccionIndex