import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { TableAnswers, TableContainer, TBodyScrollable } from '../../../styles/globals/table'
import { DivReactivoButtonsTd, PText, ThReactivo } from '../../../styles/pages/testCreator';
import EditarEscalaButton from '../buttons/editarEscalaButton';
import EliminarEscalaButton from '../buttons/eliminarEscalaButton';
import InputMapper from './inputMapper';

const DimensionTable = ({ tableHeightRef, valores, setValores }) => {
  const { escalas, dimension } = useTestCreatorContext();

  return (
    <TableContainer>
      <TableAnswers inReactivoCreator sticky>
        <thead>
          <tr>
            {
              escalas.map((escala, i) => (
                <ThReactivo noWhite={i === 0} key={i}>
                  <PText>{escala.descripcion} {dimension.constante != 0 ? dimension.constante > 0 ? `(+${dimension.constante})` : `(${dimension.constante})` : ""}</PText>
                  {
                    i != 0 &&
                    <DivReactivoButtonsTd>
                      <EditarEscalaButton escala={escala} />
                      <EliminarEscalaButton escala={escala} />
                    </DivReactivoButtonsTd>
                  }
                </ThReactivo>
              ))
            }
          </tr>
        </thead>
        <TBodyScrollable alto={tableHeightRef.current?.offsetHeight - 108 + "px"}>
          <InputMapper 
            valores={valores}
            setValores={setValores}
          />
        </TBodyScrollable>
      </TableAnswers>
    </TableContainer>
  )
}

export default DimensionTable