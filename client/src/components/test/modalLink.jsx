import React from "react";
import {
  FormContainer,
  DivText,
  PText,
  InputText,
  WhiteIconButton,
} from "../../styles/globals/formularios";
import codeId from "../../utilities/code";
import { useState } from "react";
import QRCode from "react-qr-code";
import DownloadQRButton from "./modalLink/downloadQRButton";
import { DivCenter, ModalDivButtons } from "../../styles/pages/test";

const ModalLink = ({ id, nombreTest }) => {
  let stringInd = id.toString();
  let idCode = codeId(stringInd);
  const link = window.location.href + "/share/" + idCode;
  const [option, setOption] = useState("link");

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("Se copió al portapapeles.");
  };

  return (
    <FormContainer>
      <ModalDivButtons>
        <WhiteIconButton title="Ver enlace" onClick={() => setOption("link")}>
          <i className="fa-solid fa-link"></i>
        </WhiteIconButton>
        <WhiteIconButton title="Ver código QR" onClick={() => setOption("QR")}>
          <i className="fa-solid fa-qrcode"></i>
        </WhiteIconButton>
      </ModalDivButtons>
        {
          option === "link" ? (
            <DivCenter>
              <DivText>
                <PText>¡Comparte este enlace a tus beneficiarios!</PText>
              </DivText>
              <InputText type="text" value={link} readOnly />
            </DivCenter>
          ) : option === "QR" && (
            <DivCenter>
              <DivText>
                <PText>¡Comparte este QR a tus beneficiarios!</PText>
              </DivText>
              <QRCode id="QRCode" value={link} size={128} />
            </DivCenter>
          )
        }
      <ModalDivButtons>
        {
          option === "link" ? (
            <WhiteIconButton title="Copiar al portapapeles" onClick={handleCopy}>
              <i className="fa-regular fa-copy"></i>
            </WhiteIconButton>
          ) : option === "QR" && (
            <DownloadQRButton nombreTest={nombreTest} />
          )
        }
      </ModalDivButtons>
    </FormContainer>
  );
};

export default ModalLink;