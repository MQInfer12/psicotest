import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { inversePuntuaciones } from '../../../services/puntuacion';
import { MiniWhiteIconButton } from '../../../styles/globals/formularios';

const InvertirPuntuacionesButton = ({ id, setPuntuaciones }) => {
  const { updateSeccion, setDimensiones } = useTestCreatorContext();

  const handleTurn = async () => {
    const res = await inversePuntuaciones(id);
    if(res.ok) {
      const resJson = await res?.json();
      let newPuntuaciones = [];
      updateSeccion(seccion => {
        const newSeccion = {...seccion};
        newPuntuaciones = newSeccion.puntuaciones.map(puntuacion => {
          if(puntuacion.id_pregunta === id) {
            puntuacion = resJson.data.puntuaciones.find(va => va.id === puntuacion.id);
          }
          return puntuacion;
        });
        newSeccion.puntuaciones = newPuntuaciones;
        return newSeccion;
      });
      setPuntuaciones(newPuntuaciones);
      setDimensiones(old => {
        return old.map(dimension => {
          const found = resJson.data.dimensiones.find(dim => dim.id === dimension.id);
          if(found) {
            return {...dimension, ...found};
          }
          return dimension;
        });
      });
    }
  }

  return (
    <MiniWhiteIconButton 
      title="Invertir puntuaciones" 
      onClick={handleTurn}
    >
      <i className="fa-solid fa-plus-minus"></i>
    </MiniWhiteIconButton>
  )
}

export default InvertirPuntuacionesButton