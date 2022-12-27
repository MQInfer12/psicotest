import React from "react";
import { DivAlerta, DivAlertaText, DivButtons, DivIcon, H2Title, PText } from "../../styles/global-components/sureModal";
import { DangerButton ,WhiteButton } from "../../styles/globals/formularios";

const SureModal = ({ cerrar, sure, text }) => {
  return (
    <DivAlerta>
      <DivAlertaText>
        <DivIcon className='fa-solid fa-circle-exclamation'></DivIcon>
        <H2Title>¿Estás seguro?</H2Title>
        <PText>{text}.</PText>
      </DivAlertaText>
      <DivButtons>
        <WhiteButton onClick={cerrar}>Cerrar</WhiteButton>
        <DangerButton onClick={() => {sure(); cerrar();}}>Eliminar</DangerButton>
      </DivButtons>
    </DivAlerta>
  )
}

export default SureModal;