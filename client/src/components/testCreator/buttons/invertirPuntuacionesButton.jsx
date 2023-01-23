import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { WhiteIconButton } from '../../../styles/globals/formularios';

const InvertirPuntuacionesButton = ({ id, setPuntuaciones }) => {
  const { updateSeccion } = useTestCreatorContext();

  const handleTurn = async () => {
    /* const res = await turnPuntuaciones(id);
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
    } */
  }

  return (
    <WhiteIconButton 
      title="Invertir puntuaciones" 
      onClick={handleTurn}
    >
      <i className="fa-solid fa-plus-minus"></i>
    </WhiteIconButton>
  )
}

export default InvertirPuntuacionesButton