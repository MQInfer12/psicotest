import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { WhiteIconButton } from '../../../styles/globals/formularios'
import { ControlsContainer, TwoRows } from '../../../styles/globals/table'
import { PText } from '../../../styles/pages/testCreator'
import AsignarPreguntasButton from '../buttons/asignarPreguntasButton'
import AñadirDimensionButton from '../buttons/añadirDimensionButton'
import EditarDimensionButton from '../buttons/editarDimensionButton'
import EliminarDimensionButton from '../buttons/eliminarDimensionButton'
import Points from '../points'

const DimensionControls = ({ dimensionActualState }) => {
  const { dimensionActual, setDimensionActual } = dimensionActualState;
  const { dimensiones } = useTestCreatorContext();
  const dimension = dimensionActual != dimensiones.length ? dimensiones[dimensionActual] : undefined;

  return (
    <ControlsContainer spaceBetween>
      <div>
        <WhiteIconButton title="Dimensión anterior" disabled={dimensionActual === 0} onClick={() => setDimensionActual(old => old - 1)}>
          <i className="fa-solid fa-angle-left"></i>
        </WhiteIconButton>
        {
          dimension ? (
            <WhiteIconButton title="Dimensión siguiente" onClick={() => setDimensionActual(old => old + 1)}>
              <i className="fa-solid fa-angle-right"></i>
            </WhiteIconButton>
          ) : (
            <AñadirDimensionButton />
          )
        }
      </div>
      <TwoRows>
        {
          dimension ? (
            <PText>{dimension.descripcion}</PText>
          ) : (
            <PText>Crea una dimensión para tus preguntas</PText>
          )
        }
        <Points array={dimensiones} state={dimensionActual} setState={setDimensionActual} />
      </TwoRows>
      <div>
        <AsignarPreguntasButton dimension={dimension} />
        <EditarDimensionButton dimension={dimension} />
        <EliminarDimensionButton dimension={dimension} />
      </div>
    </ControlsContainer>
  )
}

export default DimensionControls