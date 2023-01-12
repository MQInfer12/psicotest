import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { deleteEscala } from '../../../services/escala';
import { DangerIconButton } from '../../../styles/globals/formularios';
import SureModal from '../../globals/sureModal';

const EliminarEscalaButton = ({ escala }) => {
  const { setEscalas, setDimensiones } = useTestCreatorContext();

  const borrarEscala = async () => {
    const res = await deleteEscala(escala.id);
    if(res.ok) {
      setEscalas(old => old.filter(esc => esc.id != escala.id));
      setDimensiones(old => {
        return old.map(dimension => {
          const newDimension = {...dimension};
          newDimension.valores = newDimension.valores.map(valor => {
            const newValor = {...valor};
            newValor.conversiones = newValor.conversiones.filter(conversion => conversion.id_escala != escala.id);
            return newValor;
          });
          return newDimension;
        });
      });
    }
  }

  const { openModal: openDelete, closeModal: closeDelete } = useModal(
    "Eliminar escala",
    <SureModal 
      sure={borrarEscala}
      cerrar={() => closeDelete()}
      text="Se eliminará la escala permanentemente"
    />
  )

  return (
    <DangerIconButton 
      title="Eliminar escala" 
      onClick={openDelete}
    >
      <i className="fa-solid fa-trash-can"></i>
    </DangerIconButton>
  )
}

export default EliminarEscalaButton