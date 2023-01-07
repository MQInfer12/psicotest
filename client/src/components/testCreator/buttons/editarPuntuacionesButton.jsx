import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { massUpdatePuntuaciones } from '../../../services/puntuacion';
import { WhiteIconButton } from '../../../styles/globals/formularios';

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
            dimension.escalas[0].valores = resDimension.valores;
          }
          return dimension;
        });
      });
      setSave(false);
    }
  }

  return (
    <WhiteIconButton 
      title="Guardar puntuaciones" 
      onClick={handleSave}
    >
      <i className="fa-solid fa-plus"></i>
    </WhiteIconButton>
  )
}

export default EditarPuntuacionesButton