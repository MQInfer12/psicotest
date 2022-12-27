import React from 'react'
import { useModal } from '../../hooks/useModal';
import { addTest } from '../../services/test';
import { PurpleButton } from '../../styles/globals/formularios';
import { ButtonContainer } from '../../styles/pages/test';
import ModalTest from './modalTest';

const AddTestButton = ({ llenarTests }) => {
  const { openModal, closeModal } = useModal(
    "Añadir test",
    <ModalTest
      call={addTest}
      actualizar={() => {
        llenarTests();
        closeModal();
      }}
      funcion="añadir"
    />
  )

  return (
    <ButtonContainer>
      <PurpleButton onClick={openModal}>Añadir</PurpleButton>
    </ButtonContainer>
  )
}

export default AddTestButton