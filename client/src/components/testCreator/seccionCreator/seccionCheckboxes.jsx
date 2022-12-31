import React from 'react'
import { changeMultimarcado, changeVacio } from '../../../services/seccion';
import { DashPart } from '../../../styles/pages/testCreator'
import Checkbox from './checkbox';

const SeccionCheckboxes = () => {
  return (
    <DashPart>
      <Checkbox name="multimarcado" call={changeMultimarcado} text="Multimarcado de reactivos" />
      <Checkbox name="vacio" call={changeVacio} text="Aceptar respuestas vacías" />
    </DashPart>
  )
}

export default SeccionCheckboxes