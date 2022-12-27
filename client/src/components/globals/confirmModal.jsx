import React from "react";
import { DivAlerta, DivAlertaText, DivButtons, DivIcon, H2Title, PText } from "../../styles/global-components/confirmModal";
import { PurpleButton, WhiteButton } from "../../styles/globals/formularios";

const ConfirmModal = ({ cerrar, sure, text }) => {
  return (
    <DivAlerta>
      <DivAlertaText>
        <DivIcon className='fa-solid fa-circle-exclamation'></DivIcon>
        <H2Title>¿Estás seguro?</H2Title>
        <PText>{text}.</PText>
      </DivAlertaText>
      <DivButtons>
        <WhiteButton onClick={cerrar}>Cerrar</WhiteButton>
        <PurpleButton onClick={() => {sure(); cerrar();}}>Enviar</PurpleButton>
      </DivButtons>
    </DivAlerta>
  )
}

export default ConfirmModal;