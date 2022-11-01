import React from 'react';
import styled from 'styled-components';
import { FormContainer, DivInput, DivText, PText, InputText, WhiteIconButton } from '../../styles/formularios';

const ModalLink = ({ id }) => {
  const link = window.location.href + "/share/" + id;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("Se copió al portapapeles.");
  }

  return (
    <FormContainer>
      <DivInput>
        <DivText>
          <PText>¡Comparte este enlace a tus beneficiarios!</PText>
        </DivText>
        <InputText type="text" value={link} readOnly />
      </DivInput>
      <DivButtons>
        <WhiteIconButton onClick={handleCopy}>
          <i className="fa-regular fa-copy"></i>
        </WhiteIconButton>
      </DivButtons>
    </FormContainer>
  )
}

export default ModalLink;

const DivButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;