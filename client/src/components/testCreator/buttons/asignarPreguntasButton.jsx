import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { useModal } from '../../../hooks/useModal';
import { WhiteIconButton } from '../../../styles/globals/formularios'
import ModalAsignarPregunta from '../dimensionCreator/modalAsignarPregunta';

const AsignarPreguntasButton = ({ dimension }) => {
  const { secciones, setDimensiones } = useTestCreatorContext();

  const { openModal: openAsignar, closeModal: closeAsignar } = useModal(
    "Asignar preguntas",
    <ModalAsignarPregunta 
      secciones={secciones}
      dimension={dimension}
      setDimensiones={setDimensiones}
      cerrar={() => closeAsignar()}
    />
  )

  return (
    <WhiteIconButton 
      disabled={!dimension} 
      title="Asignar preguntas" 
      onClick={openAsignar}
    >
      <i className="fa-solid fa-clipboard-check"></i>
    </WhiteIconButton>
  )
}

export default AsignarPreguntasButton