import React from 'react';
import StatsPhone2 from '../../assets/landing/statsPhone2.png'
import { GrayDiv, LeftDiv, LeftInfo, OpenAccountLink, RightDiv, SendResponses, ThirdImgClip, ThirdPurpleCircle, ThirdSectionContainer } from '../../styles/pages/landing';

const ThirdSection = () => {
  return (
    <ThirdSectionContainer>
      <GrayDiv>
        <LeftDiv>
          <SendResponses>Manda y recibe tus respuestas al instante</SendResponses>
          <LeftInfo>Tus respuestas serán revisadas por tus psicólogos, puedes acceder a las funcionalidades directamente desde tu computadora o celular.</LeftInfo>
          <OpenAccountLink to="/register">Registra tu cuenta hoy</OpenAccountLink>
        </LeftDiv>
        <RightDiv>
          <ThirdPurpleCircle>
            <ThirdImgClip>
              <img src={StatsPhone2}/>
            </ThirdImgClip>
          </ThirdPurpleCircle>
        </RightDiv>
      </GrayDiv>
    </ThirdSectionContainer>
  )
}

export default ThirdSection