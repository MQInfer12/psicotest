import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { updatePregunta } from '../../../services/pregunta';
import { WhiteIconButton } from '../../../styles/globals/formularios';
import ModalPregunta from '../preguntaCreator/modalPregunta';

const EditarPreguntaButton = (props) => {
  const { updateSeccion } = useTestCreatorContext();

  const {openModal, closeModal} = useModal(
    "Editar pregunta",
    <ModalPregunta 
      call={updatePregunta}
      actualizar={(res) => {
        updateSeccion(seccion => {
          const newPreguntas = seccion.preguntas.map((pregunta) => {
            if(pregunta.id === props.id) {
              return res.data;
            }
            return pregunta;
          })
          seccion.preguntas = newPreguntas;
          return seccion;
        });
        closeModal();
      }}
      funcion="editar"
      pregunta={props}
      idSeccion={props.id_seccion}
    />
  );

  return (
    <WhiteIconButton 
      title="Editar pregunta" 
      onClick={openModal}
    >
      <i className="fa-solid fa-pencil"></i>
    </WhiteIconButton>
  )
}

export default EditarPreguntaButton