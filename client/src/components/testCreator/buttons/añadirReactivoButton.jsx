import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { addReactivo } from '../../../services/reactivo';
import { WhiteIconButton } from '../../../styles/globals/formularios'
import ModalReactivo from '../reactivoCreator/modalReactivo';

const AñadirReactivoButton = ({ setPuntuaciones }) => {
  const { seccion, setDimensiones, updateSeccion } = useTestCreatorContext();

  const { openModal, closeModal } = useModal(
    "Añadir reactivo",
    <ModalReactivo
      call={addReactivo}
      actualizar={(res) => {
        updateSeccion(seccion => {
          const newSeccion = {...seccion};
          newSeccion.reactivos = [...newSeccion.reactivos, res.data.reactivo];
          newSeccion.puntuaciones = [...newSeccion.puntuaciones, ...res.data.puntuaciones];
          setPuntuaciones(newSeccion.puntuaciones);
          return newSeccion;
        });
        setDimensiones(old => {
          return old.map(dimension => {
            const resDimension = res.data.valores.find(dim => dim.id === dimension.id);
            if(resDimension) {
              dimension.valores = resDimension.valores;
            }
            return dimension;
          });
        })
        closeModal();
      }}
      funcion="añadir"
      idSeccion={seccion.id}
    />
  );

  return (
    <WhiteIconButton 
      title="Añadir reactivo" 
      onClick={openModal} 
      disabled={seccion.reactivos.length == 6}
    >
      <i className="fa-solid fa-plus"></i>
    </WhiteIconButton>
  )
}

export default AñadirReactivoButton