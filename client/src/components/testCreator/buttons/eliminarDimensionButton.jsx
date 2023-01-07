import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { deleteDimension } from '../../../services/dimension';
import { DangerIconButton } from '../../../styles/globals/formularios';
import SureModal from '../../globals/sureModal';

const EliminarDimensionButton = ({ dimension }) => {
  const { setDimensiones } = useTestCreatorContext();

  const borrarDimension = async () => {
    const res = await deleteDimension(dimension.id);
    if(res.ok) {
      setDimensiones(old => {
        const newDimensiones = old.filter(dim => dim.id != dimension.id);
        return newDimensiones;
      });
    }
  }

  const { openModal: openDelete, closeModal: closeDelete } = useModal(
    "Eliminar dimensión",
    <SureModal 
      sure={borrarDimension}
      cerrar={() => closeDelete()}
      text="Se eliminará la dimensión permanentemente"
    />
  )

  return (
    <DangerIconButton 
      disabled={!dimension} 
      title="Eliminar dimensión" 
      onClick={openDelete}
    >
      <i className="fa-solid fa-trash-can"></i>
    </DangerIconButton>
  )
}

export default EliminarDimensionButton