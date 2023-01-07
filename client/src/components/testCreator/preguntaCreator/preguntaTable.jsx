import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { TableAnswers, TableContainer, ThAnswer, ThNumberal } from '../../../styles/globals/table';
import PreguntaCard from './preguntaCard';

const PreguntaTable = ({ tableHeightRef, preguntasPage, tableRows, selecteds, setSelecteds, rowHeight }) => {
  const { seccion } = useTestCreatorContext();

  return (
    <TableContainer hideX ref={tableHeightRef}>
      <TableAnswers>
        <thead>
          <tr>
            <ThNumberal>#</ThNumberal>
            <ThAnswer>PREGUNTA</ThAnswer>
          </tr>
        </thead>
        <tbody>
          {
            seccion.preguntas.filter((v, i) => i >= (preguntasPage - 1) * tableRows && i < preguntasPage * tableRows).map((v, i) => (
              <PreguntaCard key={i} 
                {...v} 
                index={((preguntasPage - 1) * tableRows) + (i + 1)}
                selecteds={selecteds}
                setSelecteds={setSelecteds}
                rowHeight={rowHeight}
              />
            ))
          }
        </tbody>
      </TableAnswers>
    </TableContainer>
  )
}

export default PreguntaTable