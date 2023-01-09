import React from 'react';
import { DivDouble, PLight, PLightDouble, ResponsiveTr, ThNumber } from '../../styles/globals/table';

const MiniRow = ({index, pregunta, respuesta, cantReactivos, multimarcado}) => {
  return (
    <>
      <ResponsiveTr>
        <ThNumber >{index + 1}</ThNumber>
        <td colSpan={cantReactivos}>
          <DivDouble>
            <PLightDouble center>{pregunta.descripcion}</PLightDouble>
          </DivDouble>
        </td>
      </ResponsiveTr>
      <ResponsiveTr>
        <td>
          <PLight>
            pts: {respuesta.resultados.find((resultado) => resultado.id_pregunta == pregunta.id)?.asignado}
          </PLight>
        </td>
        {
          pregunta.puntuaciones.map((puntuacion, k) => (
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
          ))
        }
      </ResponsiveTr>
    </>
  )
}

export default MiniRow