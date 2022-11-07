import React from 'react';
import styled from 'styled-components';

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

const NotContainer = styled.div`
  height: 72px;
  display: flex;
  gap: 20px;
  padding: 0 20px;
`;

const LeftDiv = styled.div`
  width: 32px;
  height: 100%;
  font-size: 20px;
  color: #D9D9D9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Line = styled.div`
  width: 0;
  height: 15px;
  border-left: 1px solid rgb(217, 217, 217, 0.4);
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
`;

const TitleNot = styled.h5`
  font-size: 16px;
  font-weight: 600;
  color: #3E435D;
  user-select: none;
`;

const DescripNot = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #ADA7A7;
  user-select: none;
`;

const LinkSpan = styled.a`
  position: relative;
  color: #670ce3;
  cursor: pointer;
  text-decoration: none;

  &::after {
    content: "";
    width: 0;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid #670ce3;
    transition: all 0.2s;
  }

  &:hover::after {
    width: 100%;
  }
`;