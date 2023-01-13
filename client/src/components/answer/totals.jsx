import React from 'react'
import { AnswersContainer, PLight, ResponsiveTr, TableAnswers, TableContainer, ThAnswer } from '../../styles/globals/table'
import { SeccionContainer, TitleSeccion } from '../../styles/pages/answer'

const Totals = ({ test }) => {
  return (
    <SeccionContainer>
      <TitleSeccion>Totales</TitleSeccion>
      <AnswersContainer maxw="800px">
        <TableContainer>
          <TableAnswers>
            <thead>
              <tr>
                <ThAnswer center>Dimensión</ThAnswer>
                <ThAnswer center>Natural</ThAnswer>
                {
                  test.escalas.map((v, i) => (
                    <ThAnswer key={i} center>{v.descripcion}</ThAnswer>
                  ))
                }
              </tr>
            </thead>
            <tbody>
                {
                  test.dimensiones.map((v, i) => (
                    <ResponsiveTr key={i}>
                      <td><PLight>{v.descripcion}</PLight></td>
                      {
                        v.puntuaciones.map((punt, j) => (
                          <td key={j}><PLight>{punt}</PLight></td>
                        ))
                      }
                    </ResponsiveTr>
                  ))
                }
            </tbody>
          </TableAnswers>
        </TableContainer>
      </AnswersContainer>
    </SeccionContainer>
  )
}

export default Totals