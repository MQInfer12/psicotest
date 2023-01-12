import React from 'react'
import { AnswersContainer, PLight, ResponsiveTr, TableAnswers, TableContainer, ThAnswer } from '../../styles/globals/table'
import { SeccionContainer, TitleSeccion } from '../../styles/pages/answer'

const Totals = () => {
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
                <ThAnswer center>Escala T</ThAnswer>
                <ThAnswer center>Percentil</ThAnswer>
              </tr>
            </thead>
            <tbody>
              <ResponsiveTr>
                <td><PLight>Inquietud/Hipersensibilidad</PLight></td>
                <td><PLight>10</PLight></td>
                <td><PLight>30</PLight></td>
                <td><PLight>47</PLight></td>
              </ResponsiveTr>
            </tbody>
          </TableAnswers>
        </TableContainer>
      </AnswersContainer>
    </SeccionContainer>
  )
}

export default Totals