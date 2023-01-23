import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { WhiteIconButton } from '../../../styles/globals/formularios'
import { ControlsContainer, TwoRows } from '../../../styles/globals/table'
import { PText } from '../../../styles/pages/testCreator'
import AsignarPreguntasButton from '../buttons/asignarPreguntasButton'
import AñadirDimensionButton from '../buttons/añadirDimensionButton'
import AñadirEscalaButton from '../buttons/añadirEscalaButton'
import EditarConversionesButton from '../buttons/editarConversionesButton'
import EditarDimensionButton from '../buttons/editarDimensionButton'
import EliminarDimensionButton from '../buttons/eliminarDimensionButton'
import ModificarConstanteButton from '../buttons/modificarConstanteButton'
import Points from '../points'

const DimensionControls = ({ valores }) => {
  const { dimensiones, dimension, dimensionActual, setDimensionActual, saveConversiones } = useTestCreatorContext();

  return (
    <ControlsContainer spaceBetween>
      <TwoRows>
        {
          dimension ? (
            <PText>{dimension.descripcion}</PText>
          ) : (
            <PText>Crea una dimensión para tus preguntas</PText>
          )
        }
        <Points 
          array={dimensiones} 
          state={dimensionActual} 
          setState={setDimensionActual} 
          disabled={saveConversiones}
        />
      </TwoRows>
      <div className='buttons'>
        <WhiteIconButton 
          title="Dimensión anterior" 
          disabled={dimensionActual === 0 || saveConversiones} 
          onClick={() => setDimensionActual(old => old - 1)}
        >
          <i className="fa-solid fa-angle-left"></i>
        </WhiteIconButton>
        {
          dimension ? (
            <WhiteIconButton 
              title="Dimensión siguiente" 
              disabled={saveConversiones}
              onClick={() => setDimensionActual(old => old + 1)}
            >
              <i className="fa-solid fa-angle-right"></i>
            </WhiteIconButton>
          ) : (
            <AñadirDimensionButton />
          )
        }
        <AsignarPreguntasButton dimension={dimension} />
        <ModificarConstanteButton dimension={dimension} />
        <EditarDimensionButton dimension={dimension} />
        <EliminarDimensionButton dimension={dimension} />
      </div>
      <div className='buttons'>
        <AñadirEscalaButton />
        <EditarConversionesButton dimension={dimension} valores={valores} />
      </div>
    </ControlsContainer>
  )
}

export default DimensionControls