import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { ErrorCss } from '../../../styles/globals/formularios'
import { ControlsContainer } from '../../../styles/globals/table'
import { HeadContainer, PSelected } from '../../../styles/pages/testCreator'
import AñadirReactivoButton from '../buttons/añadirReactivoButton'
import EditarPuntuacionesButton from '../buttons/editarPuntuacionesButton'

const ReactivoControls = ({ save, setSave, puntuaciones, setPuntuaciones }) => {
  const { seccion } = useTestCreatorContext();

  return (
    <ControlsContainer spaceBetween>
      <HeadContainer>
        <AñadirReactivoButton setPuntuaciones={setPuntuaciones} />
        <PSelected>{seccion.reactivos.length} / 6</PSelected>
      </HeadContainer>
      {
        save &&
        <HeadContainer>
          <ErrorCss>¡Guarda tus cambios!</ErrorCss>
          <EditarPuntuacionesButton setSave={setSave} puntuaciones={puntuaciones}/>
        </HeadContainer>
      }
    </ControlsContainer>
  )
}

export default ReactivoControls