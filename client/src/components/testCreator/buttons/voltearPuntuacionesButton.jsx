import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { turnPuntuaciones } from '../../../services/puntuacion';
import { MiniWhiteIconButton } from '../../../styles/globals/formularios';

const VoltearPuntuacionesButton = ({ id, setPuntuaciones }) => {
  const { updateSeccion } = useTestCreatorContext();

  const handleTurn = async () => {
    const res = await turnPuntuaciones(id);
    if(res.ok) {
      const resJson = await res?.json();
      let newPuntuaciones = [];
      updateSeccion(seccion => {
        const newSeccion = {...seccion};
        newPuntuaciones = newSeccion.puntuaciones.map(puntuacion => {
          if(puntuacion.id_pregunta === id) {
            puntuacion = resJson.data.find(va => va.id === puntuacion.id);
          }
          return puntuacion;
        });
        newSeccion.puntuaciones = newPuntuaciones;
        return newSeccion;
      });
      setPuntuaciones(newPuntuaciones)
    }
  }

  return (
    <MiniWhiteIconButton 
      title="Voltear puntuaciones" 
      onClick={handleTurn}
    >
      <i className="fa-solid fa-arrow-right-arrow-left"></i>
    </MiniWhiteIconButton>
  )
}

export default VoltearPuntuacionesButton