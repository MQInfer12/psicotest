import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { addDimension } from '../../../services/dimension';
import { WhiteIconButton } from '../../../styles/globals/formularios';
import ModalDimension from '../dimensionCreator/modalDimension';

const AñadirDimensionButton = () => {
  const { seccion, setDimensiones } = useTestCreatorContext();

  const { openModal, closeModal } = useModal(
    "Añadir dimension",
    <ModalDimension 
      call={addDimension}
      funcion="Añadir"
      actualizar={(res) => {
        setDimensiones(old => [...old, res.data]);
        closeModal();
      }}
      idTest={seccion.id_test}
    />
  )

  return (
    <WhiteIconButton 
      title="Añadir dimensión" 
      onClick={openModal}
    >
      <i className="fa-solid fa-brain"></i>
    </WhiteIconButton>
  )
}

export default AñadirDimensionButton