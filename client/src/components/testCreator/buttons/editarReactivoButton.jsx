import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { updateReactivo } from '../../../services/reactivo';
import { WhiteIconButton } from '../../../styles/globals/formularios';
import ModalReactivo from '../reactivoCreator/modalReactivo';

const EditarReactivoButton = (props) => {
  const { updateSeccion } = useTestCreatorContext();

  const { openModal: openEdit, closeModal: closeEdit } = useModal(
    "Editar reactivo",
    <ModalReactivo 
      call={updateReactivo}
      actualizar={res => {
        updateSeccion(seccion => {
          seccion.reactivos = seccion.reactivos.map((reactivo) => {
            if(reactivo.id === props.id) {
              return res.data;
            }
            return reactivo;
          });
          return seccion;
        });
        closeEdit();
      }}
      funcion="editar"
      reactivo={props}
      idSeccion={props.id_seccion}
    />
  )

  return (
    <WhiteIconButton 
      title="Editar reactivo" 
      onClick={openEdit}
    >
      <i className="fa-solid fa-pencil"></i>
    </WhiteIconButton>
  )
}

export default EditarReactivoButton