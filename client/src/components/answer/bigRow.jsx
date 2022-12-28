import React from 'react'
import { DivDouble, PLight, PLightDouble, ResponsiveTr, ThNumber } from '../../styles/globals/table'

const BigRow = ({index, pregunta, respuesta, multimarcado}) => {
  return (
    <ResponsiveTr>
      <ThNumber>{index + 1}</ThNumber>
      <td>
        <DivDouble>
          <PLightDouble>{pregunta.descripcion}</PLightDouble>
        </DivDouble>
      </td>
      {
        /* TODO: PUNTUACIONES EN MULTIMARCADO */
        !multimarcado && 
        <td>
          {respuesta.resultados
            .filter(
              (resultado) =>
                resultado.puntuacion[0].id_pregunta == pregunta.id
            )
            .map((puntaje, k) => (
              <PLight key={k}>
                {puntaje.puntuacion[0].asignado}
              </PLight>
            ))}
        </td>
      }
      {pregunta.puntuaciones.map((puntuacion, k) => (
        <td key={k}>
          <input
            type={multimarcado ? "checkbox" : "radio"}
            name={pregunta.id}
            value={puntuacion.id}
            disabled
            defaultChecked={
              respuesta.resultados.find((resultado) =>
                puntuacion.id == resultado.id_puntuacion
              )
            }
          />
        </td>
      ))}
    </ResponsiveTr>
  )
}

export default BigRow