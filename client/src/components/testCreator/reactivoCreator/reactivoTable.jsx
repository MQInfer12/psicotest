import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { TableAnswers, TableContainer, ThNumberal } from '../../../styles/globals/table'
import ReactivoCard from './reactivoCard'
import ReactivoTableBody from './reactivoTableBody'

const ReactivoTable = ({ tableHeightRef, rowHeight, tableRows, puntuaciones, setPuntuaciones, reactivosPage, setSave }) => {
  const { seccion } = useTestCreatorContext();

  return (
    <TableContainer ref={tableHeightRef}>
      <TableAnswers inReactivoCreator>
        <thead>
          <tr>
            <ThNumberal>#</ThNumberal>
            {
              seccion.reactivos.map((v, i) => (
                <ReactivoCard 
                  key={i} 
                  {...v}
                  setPuntuaciones={setPuntuaciones}
                />
              ))
            }
          </tr>
        </thead>
        <ReactivoTableBody
          reactivosPage={reactivosPage} 
          puntuaciones={puntuaciones}
          setPuntuaciones={setPuntuaciones}
          setSave={setSave}
          rowHeight={rowHeight}
          tableRows={tableRows}
        />
      </TableAnswers>
    </TableContainer>
  )
}

export default ReactivoTable