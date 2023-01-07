import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { changeMultimarcado, changeVacio } from '../../../services/seccion';
import { DashPart } from '../../../styles/pages/testCreator'
import Checkbox from './checkbox';

const SeccionCheckboxes = () => {
  const { setDimensiones } = useTestCreatorContext();

  return (
    <DashPart>
      <Checkbox 
        name="multimarcado" 
        call={changeMultimarcado} 
        text="Multimarcado de reactivos" 
      />
      <Checkbox 
        name="vacio" 
        call={changeVacio} 
        text="Aceptar respuestas vacías" 
        cb={resJson => {
          setDimensiones(old => {
            return old.map(dimension => {
              const resDimension = resJson.data.find(dim => dim.id === dimension.id);
              if(resDimension) {
                dimension.escalas[0].valores = resDimension.valores;
              }
              return dimension;
            })
          })
        }}
      />
    </DashPart>
  )
}

export default SeccionCheckboxes