import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { deleteSeccion } from '../../../services/seccion';
import { DangerButton } from '../../../styles/globals/formularios';
import SureModal from '../../globals/sureModal';

const EliminarSeccionButton = () => {
  const { seccion, setSecciones } = useTestCreatorContext();

  const eliminarSeccion = async () => {
    const res = await deleteSeccion(seccion.id);
    if(res.ok) {
      setSecciones(old => {
        return old.filter((v, i) => v.id !== seccion.id);
      })
      console.log("Se eliminó la sección");
    }
  }

  const { openModal, closeModal } = useModal(
    "Eliminar sección",
    <SureModal
      cerrar={() => closeModal()}
      sure={eliminarSeccion}
      text="Se eliminará esta sección permanentemente"
    />
  );

  return (
    <DangerButton 
      onClick={openModal}
    >
      Eliminar Sección
    </DangerButton>
  )
}

export default EliminarSeccionButton