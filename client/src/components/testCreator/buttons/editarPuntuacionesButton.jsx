import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { massUpdatePuntuaciones } from '../../../services/puntuacion';
import { DangerIconButton } from '../../../styles/globals/formularios';

const EditarPuntuacionesButton = ({ setSave, puntuaciones }) => {
  const { setDimensiones, updateSeccion } = useTestCreatorContext();

  const handleSave = async () => {
    const res = await massUpdatePuntuaciones(puntuaciones);
    if(res.ok) {
      const resJson = await res?.json();
      updateSeccion(seccion => {
        const newSeccion = {...seccion};
        newSeccion.puntuaciones = puntuaciones;
        return newSeccion;
      });
      setDimensiones(old => {
        return old.map(dimension => {
          const resDimension = resJson.data.find(dim => dim.id === dimension.id);
          if(resDimension) {
            dimension.valores = resDimension.valores;
          }
          return dimension;
        });
      });
      setSave(false);
    }
  }

  return (
    <DangerIconButton 
      title="Guardar puntuaciones" 
      onClick={handleSave}
    >
      <i className="fa-solid fa-floppy-disk"></i>
    </DangerIconButton>
  )
}

export default EditarPuntuacionesButton