import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FirstSectionImg from '../../images/landing/womanPhone.png';

const Container = styled.div`
  min-height: 100vh;
  display: flex;

  & > div {
    padding-top: 90px;
  }
`;

const LeftContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
`;

const InfoContainer = styled.div`
  width: 443px;
  display: flex;
  flex-direction: column;
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
`;

const RightContainer = styled.div`
  min-width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:  #F5F5F5;
`;

const PurpleCircle = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
  position: relative;
`;

const ImgClip = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 110%;
  display: flex;
  justify-content: center;
  border-radius: 0 0 250px 250px;
  overflow: hidden;
`;

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
            <img src={FirstSectionImg} />
          </ImgClip>
        </PurpleCircle>
      </RightContainer>
    </Container>
  )
}

export default FirstSection