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
      <td>
        <PLight>
          {respuesta.resultados.find((resultado) => resultado.id_pregunta == pregunta.id)?.asignado}
        </PLight>
      </td>
      {
        pregunta.puntuaciones.map((puntuacion, k) => (
          <td key={k}>
            <input
              type={multimarcado ? "checkbox" : "radio"}
              disabled
              defaultChecked={
                respuesta.resultados.find((resultado) =>
                  puntuacion.id == resultado.id_puntuacion
                )
              }
            />
          </td>
        ))
      }
    </ResponsiveTr>
  )
}

export default BigRow