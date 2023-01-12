import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { addEscala } from '../../../services/escala';
import { WhiteIconButton } from '../../../styles/globals/formularios'
import ModalDimension from '../dimensionCreator/modalDimension';

const AñadirEscalaButton = () => {
  const { seccion, setEscalas, setDimensiones } = useTestCreatorContext();

  const { openModal, closeModal } = useModal(
    "Añadir escala",
    <ModalDimension 
      call={addEscala}
      funcion="Añadir"
      actualizar={(res) => {
        setEscalas(old => {
          return [...old, res.data.escala];
        });
        setDimensiones(old => {
          return old.map(dimension => {
            const newDimension = {...dimension};
            const search = res.data.naturales.find(natural => natural.id === dimension.id);
            newDimension.valores = search.valores;
            return newDimension;
          });
        });
        closeModal();
      }}
      idTest={seccion.id_test}
    />
  )

  return (
    <WhiteIconButton 
      title="Añadir escala"
      onClick={openModal}
    >
      <i className="fa-solid fa-scale-balanced"></i>
    </WhiteIconButton>
  )
}

export default AñadirEscalaButton