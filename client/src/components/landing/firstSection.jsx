import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles/devices';
import FirstSectionImg from '../../images/landing/womanPhone.png';

const FirstSection = () => {
  return (
    <Container>
      <LeftContainer>
        <InfoContainer>
          <NewContainer>¡Lanzamos la aplicación!</NewContainer>
          <BestPlatform>La mejor Plataforma</BestPlatform>
          <PlatformInfo>Dile adiós a las plataformas de test psicológicos y disfruta de las funcionalidades por parte de Unifranz.</PlatformInfo>
          <OpenAccountLink to="/register">Abre tu cuenta hoy</OpenAccountLink>
        </InfoContainer>
      </LeftContainer>
      <RightContainer>
        <PurpleCircle>
          <ImgClip>
            <Img src={FirstSectionImg} />
          </ImgClip>
        </PurpleCircle>
      </RightContainer>
    </Container>
  )
}

export default FirstSection

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;

  @media ${device.laptop} {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  padding: 30px;
  padding-top: 90px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
`;

const InfoContainer = styled.div`
  max-width: 443px;
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    transform: scale(0.8);
  }
`;

const NewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 400;
  color: #6209DB;
  padding-bottom: 10px;

  &::before {
    content: "Nuevo";
    padding: 4px 6px;
    color: #FFFFFF;
    background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
    border-radius: 6px;
  }
`;

const BestPlatform = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 138.4%;
  padding-bottom: 30px;

  &::after {
    content: ".";
    color: #6209DB;
  }
`;

const PlatformInfo = styled.h3`
  font-size: 20px;
  font-weight: 400;
  padding-bottom: 30px;
`;

const OpenAccountLink = styled(Link)`
  text-decoration: none;
  width: fit-content;
  background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
  border-radius: 6px;
  padding: 20px;
  color: #FFFFFF;
  font-weight: 300;
  transition: all 0.3s;

  &:hover {
    filter: grayscale(0.2);
  }
`;

const RightContainer = styled.div`
  padding: 10px;
  padding-top: 90px;
  min-width: 350px;
  width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:  #F5F5F5;

  @media ${device.laptop} {
    padding: 40px 10px;
    width: 100%;
  }
`;

const PurpleCircle = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
  position: relative;

  @media (max-width: 520px) {
    width: 350px;
    height: 350px;
  }
`;

const ImgClip = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  border-radius: 0 0 50% 50%;
  overflow: hidden;
`;

const Img = styled.img`
  @media (max-width: 520px) {
    width: 218.75px;
  }
`;