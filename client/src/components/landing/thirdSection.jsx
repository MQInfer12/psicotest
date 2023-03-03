import React from 'react';
import StatsPhone2 from '../../assets/landing/statsPhone3.png'
import { GrayDiv, LeftDiv, LeftInfo, OpenAccountLink, RightDiv, SendResponses, ThirdImgClip, ThirdPurpleCircle, ThirdSectionContainer } from '../../styles/pages/landing';

const ThirdSection = () => {
  return (
    <ThirdSectionContainer>
      <GrayDiv>
        <LeftDiv>
          <SendResponses>Lee artículos de nuestros psicólogos</SendResponses>
          <LeftInfo>Nuestros psicólogos se esfuerzan realizando artículos interesantes que podemos leer y disfrutar para conocer más acerca de lo que nos rodea.</LeftInfo>
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