import React from 'react'
import { TableAnswers, ThAnswer, TrBorder } from '../../styles/globals/table'
import { TableBFQContainer } from '../../styles/pages/answer'
import BfqRows from './bfqRows';

const BfqGraph = ({ test }) => {
  const { dimensiones } = test;

  //TODO: HARDCODED
  const dimensionesGrandesIds = [4, 7, 11, 14, 17, 18];

  return (
    <TableBFQContainer>
      <TableAnswers>
        <thead>
          <tr>
            <th colSpan={3}></th>
            <ThAnswer center>MUY BAJO</ThAnswer>
            <ThAnswer center>BAJO</ThAnswer>
            <ThAnswer center>PROMEDIO</ThAnswer>
            <ThAnswer center>ALTO</ThAnswer>
            <ThAnswer center>MUY ALTO</ThAnswer>
          </tr>
          <tr>
            <ThAnswer center>Dimensión</ThAnswer>
            <ThAnswer center>Natural</ThAnswer>
            <ThAnswer center>Escala T</ThAnswer>
            <ThAnswer center>30</ThAnswer>
            <ThAnswer center>40</ThAnswer>
            <ThAnswer center>50</ThAnswer>
            <ThAnswer center>60</ThAnswer>
            <ThAnswer center>70</ThAnswer>
          </tr>
        </thead>
        <tbody>
            <BfqRows dimensiones={dimensiones.filter(dimension => dimensionesGrandesIds.includes(dimension.id))} />
            <TrBorder />
            <BfqRows dimensiones={dimensiones.filter(dimension => !dimensionesGrandesIds.includes(dimension.id))} />
        </tbody>
      </TableAnswers>
    </TableBFQContainer>
  )
}

export default BfqGraph