import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { PLight, ResponsiveTr, TableAnswers, TableContainer, ThAnswer } from '../../../styles/globals/table'

const DimensionTable = ({ dimensionActualState }) => {
  const {dimensionActual } = dimensionActualState;
  const { dimensiones } = useTestCreatorContext();
  const dimension = dimensionActual != dimensiones.length ? dimensiones[dimensionActual] : undefined;

  return (
    <TableContainer scrollable>
      <TableAnswers inReactivoCreator sticky>
        <thead>
          <tr>
            {
              dimension.escalas.map((escala, i) => (
                <ThAnswer key={i} center>{escala.nombre}</ThAnswer>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            dimension.escalas.map((escala, i) => (
              escala.valores.map((valor, j) => (
                <ResponsiveTr key={j}>
                  <td>
                    <PLight>{valor.natural}</PLight>
                  </td>
                </ResponsiveTr>
              ))
            ))
          }
        </tbody>
      </TableAnswers>
    </TableContainer>
  )
}

export default DimensionTable