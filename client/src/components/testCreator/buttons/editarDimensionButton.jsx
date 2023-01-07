import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { updateDimension } from '../../../services/dimension';
import { WhiteIconButton } from '../../../styles/globals/formularios'
import ModalDimension from '../dimensionCreator/modalDimension';

const EditarDimensionButton = ({ dimension }) => {
  const { setDimensiones } = useTestCreatorContext();

  const { openModal: openEditar, closeModal: closeEditar } = useModal(
    "Editar dimensión",
    <ModalDimension 
      call={updateDimension}
      funcion="Editar"
      actualizar={res => {
        setDimensiones(old => old.map(dimension => {
          if(dimension.id === res.data.id) {
            return {...dimension, ...res.data};
          }
          return dimension;
        }));
        closeEditar();
      }}
      dimension={dimension}
    />
  )

  return (
    <WhiteIconButton 
      disabled={!dimension} 
      title="Editar dimensión" 
      onClick={openEditar}
    >
      <i className="fa-solid fa-pencil"></i>
    </WhiteIconButton>
  )
}

export default EditarDimensionButton