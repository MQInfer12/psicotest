import React from 'react'
import { useState } from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { PreguntaCreatorContainer } from '../../../styles/pages/testCreator'
import DimensionControls from './dimensionControls'
import DimensionTable from './dimensionTable'

const DimensionCreator = () => {
  const [dimensionActual, setDimensionActual] = useState(0);
  const { dimensiones } = useTestCreatorContext();
  const dimension = dimensionActual != dimensiones.length ? dimensiones[dimensionActual] : undefined;

  return (
    <PreguntaCreatorContainer>
      <DimensionControls 
        dimensionActualState={{dimensionActual, setDimensionActual}}
      />
      {
        dimension &&
        <DimensionTable 
          dimensionActualState={{dimensionActual, setDimensionActual}}
        />
      }
    </PreguntaCreatorContainer>
  )
}

export default DimensionCreator