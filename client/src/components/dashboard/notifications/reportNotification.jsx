import React from 'react';
import { DescripNot, LeftDiv, Line, LinkSpan, NotContainer, RightDiv, TitleNot } from '../../../styles/pages/dashboard';

const ReportNotification = ({ setShowNots }) => {
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
          ¡Haznosló conocer! <LinkSpan onClick={() => setShowNots(false)} href="mailto:maummq@gmail.com?subject=¡Encontre%20un%20error!">Click aquí</LinkSpan>
        </DescripNot>
      </RightDiv>
    </NotContainer>
  )
}

export default ReportNotification