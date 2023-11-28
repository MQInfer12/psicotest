import React from 'react'
import { WhiteIconButton } from '../../../styles/globals/formularios'
import { useModal } from '../../../hooks/useModal';
import ModalStringToPoints from '../dimensionCreator/modalStringToPoints';
import { useTestCreatorContext } from '../../../context/testCreatorContext';

const StringToPointsButton = ({ escala, setValores }) => {
  const { setSaveConversiones } = useTestCreatorContext();

  const { openModal, closeModal } = useModal(
    "Editar escala",
    <ModalStringToPoints 
      close={() => closeModal()}
      escala={escala}
      setValores={setValores}
      setSaveConversiones={setSaveConversiones}
    />
  )

  return (
    <WhiteIconButton onClick={openModal}>
      <i className="fa-solid fa-list-ol"></i> 
    </WhiteIconButton>
  )
}

export default StringToPointsButton