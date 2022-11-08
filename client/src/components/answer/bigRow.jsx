import React from 'react'
import { DivDouble, PLight, PLightDouble, ResponsiveTr, ThNumber } from '../../styles/table'

const BigRow = ({index, pregunta, respuesta}) => {
  return (
    <ResponsiveTr>
      <ThNumber>{index + 1}</ThNumber>
      <td>
        <DivDouble>
          <PLightDouble>{pregunta.descripcion}</PLightDouble>
        </DivDouble>
      </td>
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
      {pregunta.puntuaciones.map((puntuacion, k) => (
        <td key={k}>
          <input
            type="radio"
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