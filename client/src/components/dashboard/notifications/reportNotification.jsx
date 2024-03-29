import React from 'react';
import { DescripNot, LeftDiv, Line, LinkSpan, NotContainer, RightDiv, TitleNot } from '../../../styles/pages/dashboard';

const ReportNotification = ({ setShowNots }) => {
  const reportError = () => {
    window.open("mailto:maummq@gmail.com?subject=¡Encontre%20un%20error!", "_blank")
    setShowNots(false);
  }

  return (
    <NotContainer>
      <LeftDiv>
        <Line />
        <i className="fa-solid fa-triangle-exclamation"></i>
        <Line />
      </LeftDiv>
      <RightDiv>
        <TitleNot>¿Encontraste un error?</TitleNot>
        <DescripNot>
          ¡Haznosló conocer! <LinkSpan onClick={reportError}>Click aquí</LinkSpan>
        </DescripNot>
      </RightDiv>
    </NotContainer>
  )
}

export default ReportNotification