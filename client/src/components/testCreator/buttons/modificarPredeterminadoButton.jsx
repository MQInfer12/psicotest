import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { WhiteIconButton } from '../../../styles/globals/formularios'
import ModalPuntuacion from '../reactivoCreator/modalPuntuacion';

const ModificarPredeterminadoButton = (props) => {
  const { updateSeccion, setDimensiones } = useTestCreatorContext();

  const { openModal: openPredeterminado, closeModal: closePredeterminado } = useModal(
    "Establecer puntuación",
    <ModalPuntuacion 
      actualizar={(res) => {
        updateSeccion(seccion => {
          seccion.reactivos.find(reactivo => reactivo.id === props.id).predeterminado = Number(res.data.predeterminado);
          const newPuntuaciones = seccion.puntuaciones.map(puntuacion => {
            if(puntuacion.id_reactivo === props.id) {
              puntuacion.asignado = Number(res.data.predeterminado);
            }
            return puntuacion;
          });
          seccion.puntuaciones = newPuntuaciones;
          return seccion;
        });
        setDimensiones(old => {
          return old.map(dimension => {
            const resDimension = res.data.valores.find(dim => dim.id === dimension.id);
            if(resDimension) {
              dimension.valores = resDimension.valores;
            }
            return dimension;
          })
        });
        closePredeterminado();
      }}
      reactivo={props}
    />
  )

  return (
    <WhiteIconButton 
      title="Establecer puntuación de la columna" 
      onClick={openPredeterminado}
    >
      <i className="fa-solid fa-marker"></i>
    </WhiteIconButton>
  )
}

export default ModificarPredeterminadoButton