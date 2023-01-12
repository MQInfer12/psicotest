import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { useTableHeight } from '../../../hooks/useTableHeight'
import { PreguntaCreatorContainer } from '../../../styles/pages/testCreator'
import DimensionControls from './dimensionControls'
import DimensionTable from './dimensionTable'

const DimensionCreator = () => {
  const { dimension, dimensiones } = useTestCreatorContext();
  const [ valores, setValores ] = useState(dimension?.valores);
  const { tableHeightRef } = useTableHeight();

  useEffect(() => {
    setValores(old => {
      if(dimension) {
        const { valores } = dimension;
        const newValores = valores.map(valor => {
          const newValor = {...valor};
          newValor.conversiones = newValor.conversiones.map(conversion => {
            let returnedValor = conversion;
            old.forEach(oldValor => {
              oldValor.conversiones.forEach(oldConversion => {
                if(conversion.natural === oldConversion.natural && conversion.id_escala_dimension === oldConversion.id_escala_dimension) {
                  // antes había entonces se reemplaza en el nuevo para no perder los cambios
                  returnedValor = oldConversion;
                }
              });
            });
            return returnedValor;
          });
          return newValor;
        });
        return newValores;
      }
      return old;
    });
  }, [dimension, dimensiones]);

  return (
    <PreguntaCreatorContainer hidden ref={tableHeightRef}>
      <DimensionControls valores={valores} />
      {
        dimension &&
        <DimensionTable 
          tableHeightRef={tableHeightRef}
          valores={valores}
          setValores={setValores}
        />
      }
    </PreguntaCreatorContainer>
  )
}

export default DimensionCreator