import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StatsPhone2 from '../../images/landing/statsPhone2.png'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GrayDiv = styled.div`
  height: 535px;
  width: 1200px;
  background-color: #F5F5F5;
  border-radius: 50px;
  padding: 50px 100px;
  display: flex;
  justify-content: space-between;
`;

const LeftDiv = styled.div`
  width: 590px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SendResponses = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 138.4%;

  &::after {
    content: ".";
    color: #6209DB;
  }
`;

const LeftInfo = styled.p`
  width: 99%;
  font-size: 20px;
  font-weight: 400;
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

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const PurpleCircle = styled.div`
  width: 350px;
  height: 350px;
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
  border-radius: 0 0 175px 175px;
  overflow: hidden;
`;

const ThirdSection = () => {
  return (
    <Container>
      <GrayDiv>
        <LeftDiv>
          <SendResponses>Manda y recibe tus respuestas al instante</SendResponses>
          <LeftInfo>Tu dinero está seguro en todo momento, puedes consultar todos los movimientos de tu cuenta directamente desde tu celular.</LeftInfo>
          <OpenAccountLink to="/register">Abre tu cuenta hoy</OpenAccountLink>
        </LeftDiv>
        <RightDiv>
          <PurpleCircle>
            <ImgClip>
              <img src={StatsPhone2}/>
            </ImgClip>
          </PurpleCircle>
        </RightDiv>
      </GrayDiv>
    </Container>
  )
}

export default ThirdSection