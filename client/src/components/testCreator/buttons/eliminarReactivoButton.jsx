import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { deleteReactivo } from '../../../services/reactivo';
import { DangerIconButton } from '../../../styles/globals/formularios'
import SureModal from '../../globals/sureModal';

const EliminarReactivoButton = ({ id, setPuntuaciones }) => {
  const { updateSeccion, setDimensiones } = useTestCreatorContext();

  const borrarReactivo = async () => {
    const res = await deleteReactivo(id);
    if(res.ok) {
      const resJson = await res?.json();
      updateSeccion(seccion => {
        const newSeccion = {...seccion};
        newSeccion.reactivos = seccion.reactivos.filter((reactivo) => reactivo.id != id);
        newSeccion.puntuaciones = seccion.puntuaciones.filter(puntuacion => puntuacion.id_reactivo != id);
        setPuntuaciones(newSeccion.puntuaciones);
        return newSeccion;
      });
      setDimensiones(old => {
        return old.map(dimension => {
          const resDimension = resJson.data.find(dim => dim.id === dimension.id);
          if(resDimension) {
            dimension.escalas[0].valores = resDimension.valores;
          }
          return dimension;
        });
      });
      console.log("Se borro correctamente");
    }
  }

  const { openModal: openDelete, closeModal: closeDelete } = useModal(
    "Eliminar reactivo",
    <SureModal
      cerrar={() => closeDelete()}
      sure={borrarReactivo}
      text="Se eliminará el reactivo permanentemente"
    />
  )

  return (
    <DangerIconButton 
      title="Eliminar reactivo" 
      onClick={openDelete}
    >
      <i className="fa-solid fa-trash-can"></i>
    </DangerIconButton>
  )
}

export default EliminarReactivoButton