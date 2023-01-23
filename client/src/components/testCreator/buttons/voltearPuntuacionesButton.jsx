import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { turnPuntuaciones } from '../../../services/puntuacion';
import { WhiteIconButton } from '../../../styles/globals/formularios';

const VoltearPuntuacionesButton = ({ id, setPuntuaciones }) => {
  const { updateSeccion } = useTestCreatorContext();

  const handleTurn = async () => {
    const res = await turnPuntuaciones(id);
    if(res.ok) {
      const resJson = await res?.json();
      updateSeccion(seccion => {
        const newPuntuaciones = seccion.puntuaciones.map(puntuacion => {
          if(puntuacion.id_pregunta === id) {
            puntuacion = resJson.data.find(va => va.id === puntuacion.id);
          }
          return puntuacion;
        });
        seccion.puntuaciones = newPuntuaciones;
        setPuntuaciones(newPuntuaciones);
        return seccion;
      });
    }
  }

  return (
    <WhiteIconButton 
      title="Voltear puntuaciones" 
      onClick={handleTurn}
    >
      <i className="fa-solid fa-arrow-right-arrow-left"></i>
    </WhiteIconButton>
  )
}

export default VoltearPuntuacionesButton