import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { useModal } from '../../../hooks/useModal'
import { WhiteIconButton } from '../../../styles/globals/formularios'
import ModalConstante from '../dimensionCreator/modalConstante'

const ModificarConstanteButton = ({ dimension }) => {
  const { setDimensiones } = useTestCreatorContext();

  const { openModal, closeModal } = useModal(
    "Editar constante",
    <ModalConstante
      dimension={dimension}
      actualizar={res => {
        setDimensiones(old => {
          return old.map(dim => {
            if(dim === dimension) {
              dim.constante = Number(res.data.constante);
              dim.valores = res.data.valores;
            }
            return dim;
          });
        });
        closeModal();
      }}
    />
  )

  return (
    <WhiteIconButton 
      disabled={!dimension}
      title={"Editar constante"}
      onClick={openModal} 
    >
      <i className="fa-solid fa-hashtag"></i>
    </WhiteIconButton>
  )
}

export default ModificarConstanteButton