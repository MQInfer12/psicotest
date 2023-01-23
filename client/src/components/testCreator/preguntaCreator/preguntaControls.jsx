import React from 'react'
import { ControlsContainer } from '../../../styles/globals/table'
import { DeleteContainer, PSelected } from '../../../styles/pages/testCreator'
import AñadirPreguntaButton from '../buttons/añadirPreguntaButton'
import EliminarPreguntasButton from '../buttons/eliminarPreguntasButton'

const PreguntaControls = ({ selecteds, setSelecteds, tableRows, setPage }) => {
  return (
    <ControlsContainer spaceBetween>
      <AñadirPreguntaButton tableRows={tableRows} setPage={setPage} />
      <DeleteContainer>
        <PSelected>{selecteds.length} seleccionadas</PSelected>
        {/* FIXME: BOTON AL CAMBIAR DE SECCION CON PREGUNTAS SELECCIONADAS */}
        <EliminarPreguntasButton selecteds={selecteds} setSelecteds={setSelecteds} />
      </DeleteContainer>
    </ControlsContainer>
  )
}

export default PreguntaControls