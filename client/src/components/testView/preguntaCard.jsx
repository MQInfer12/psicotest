import React from 'react'
import { useState } from 'react'
import { EntendidoButton, Instructions, Pregunta, PreguntaContainer, PreguntaIndex, ReactivosContainer, SeccionInfo, UnaPreguntaContainer } from '../../styles/pages/testView'
import RadioButton from './radioButton'

const PreguntaCard = ({ indexPregunta, cont, preguntasTotales, pregunta, seccion, setResultados }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <UnaPreguntaContainer translate={indexPregunta}>
      <PreguntaContainer>
        <PreguntaIndex>
          P{cont}: {cont}/{preguntasTotales}
          {
            seccion.instruccion &&
            <SeccionInfo active={showInstructions} onClick={() => setShowInstructions(!showInstructions)}>
              <i className="fa-solid fa-info"></i>
            </SeccionInfo>
          }
        </PreguntaIndex>
        {
          showInstructions ? 
          <Instructions>
            {seccion.instruccion}
            <EntendidoButton onClick={() => setShowInstructions(false)}>Entendido</EntendidoButton>
          </Instructions> :
          <Pregunta>{pregunta.descripcion}</Pregunta>
        }
      </PreguntaContainer>
      <ReactivosContainer>
        {seccion.reactivos.map((reactivo, i) => (
          <RadioButton key={i}
            indice={cont}
            setResultados={setResultados}
            valor={pregunta.puntuaciones.find(puntuacion => puntuacion.id_reactivo == reactivo.id).id}
            descripcion={reactivo.descripcion}
            multimarcado={seccion.multimarcado}
          />
        ))}
      </ReactivosContainer>
    </UnaPreguntaContainer>
  )
}

export default PreguntaCard