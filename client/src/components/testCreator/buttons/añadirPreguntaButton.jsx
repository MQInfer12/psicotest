import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { addPregunta } from '../../../services/pregunta';
import { WhiteIconButton } from '../../../styles/globals/formularios'
import ModalPregunta from '../preguntaCreator/modalPregunta';

const AñadirPreguntaButton = () => {
  const { seccion, updateSeccion } = useTestCreatorContext();

  const { openModal: openAdd, closeModal: closeAdd } = useModal(
    "Añadir pregunta",
    <ModalPregunta
      call={addPregunta}
      actualizar={res => {
        updateSeccion(seccion => {
          const newSeccion = {...seccion};
          newSeccion.preguntas = [...newSeccion.preguntas, res.data.pregunta];
          newSeccion.puntuaciones = [...newSeccion.puntuaciones, ...res.data.puntuaciones];
          return newSeccion;
        });
        closeAdd();
      }}
      funcion="añadir"
      idSeccion={seccion.id}
    />
  );

  return (
    <WhiteIconButton 
      title="Añadir pregunta" 
      onClick={openAdd}
    >
      <i className="fa-solid fa-plus"></i>
    </WhiteIconButton>
  )
}

export default AñadirPreguntaButton