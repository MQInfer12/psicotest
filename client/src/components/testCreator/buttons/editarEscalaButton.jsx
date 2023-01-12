import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { updateEscala } from '../../../services/escala';
import { WhiteIconButton } from '../../../styles/globals/formularios';
import ModalDimension from '../dimensionCreator/modalDimension';

const EditarEscalaButton = ({ escala }) => {
  const { setEscalas } = useTestCreatorContext();

  const { openModal: openEditar, closeModal: closeEditar } = useModal(
    "Editar escala",
    <ModalDimension 
      call={updateEscala}
      funcion="Editar"
      actualizar={res => {
        setEscalas(old => {
          return old.map(esc => {
            if(esc.id === escala.id) {
              esc = res.data;
            }
            return esc;
          });
        });
        closeEditar();
      }}
      dimension={escala}
    />
  )

  return (
    <WhiteIconButton
      title="Editar escala" 
      onClick={openEditar}
    >
      <i className="fa-solid fa-pencil"></i>
    </WhiteIconButton>
  )
}

export default EditarEscalaButton