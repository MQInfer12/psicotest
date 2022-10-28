import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles/devices';
import StatsPhone from '../../images/landing/statsPhone.png';

const SecondSection = () => {
  return (
    <Container>
      <ColumnContainer>
        <PurpleDiv>
          <YouDecide>Conócete.</YouDecide>
          <img src={StatsPhone} />
        </PurpleDiv>
      </ColumnContainer>
      <ColumnContainer>
        <InfoContainer>
          <MakeYourTests>Realiza tus tests</MakeYourTests>
          <FeatureContainer>
            <IndexContainer>
              <FeatureIndex>01</FeatureIndex>
              <FeatureLine></FeatureLine>
            </IndexContainer>
            <IndexContainer>
              <FeatureTitle>Mayor eficacia</FeatureTitle>
              <FeatureDescription>Es muy sencillo, solamente ingresa a tu cuenta y empieza.</FeatureDescription>
            </IndexContainer>
          </FeatureContainer>
          <FeatureContainer>
            <IndexContainer>
              <FeatureIndex>02</FeatureIndex>
              <FeatureLine></FeatureLine>
            </IndexContainer>
            <IndexContainer>
              <FeatureTitle>Autoconócete</FeatureTitle>
              <FeatureDescription>Selecciona un test que te asignaron. ¡Te sorprenderán tus respuestas!.</FeatureDescription>
            </IndexContainer>
          </FeatureContainer>
          <FeatureContainer>
            <IndexContainer>
              <FeatureIndex>03</FeatureIndex>
              <FeatureLine></FeatureLine>
            </IndexContainer>
            <IndexContainer>
              <FeatureTitle>Relaciónate</FeatureTitle>
              <FeatureDescription>Conversa y obtén citas con tus psicólogos asignados.</FeatureDescription>
            </IndexContainer>
          </FeatureContainer>
        </InfoContainer>
      </ColumnContainer>
    </Container>
  )
}

export default SecondSection

const Container = styled.div`
  padding: 60px 0;
  display: flex;

  @media ${device.laptop} {
    flex-direction: reverse;
  }
`;

const ColumnContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  padding: 10px;

  @media ${device.laptop} {
    &:first-child {
      display: none;
    }
  }
`;

const PurpleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 40px;
  width: 500px;
  height: 600px;
  background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
  border-radius: 50px;
  overflow: hidden;
`;

const YouDecide = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 138.4%;
  color: #FFFFFF;
`;

const InfoContainer = styled.div`
  width: 482px;
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    transform: scale(0.8);
  }
`;

const MakeYourTests = styled.h2`
  font-size: 60px;
  font-weight: 700;
  padding-bottom: 40px;
  line-height: 138.4%;

  &::after {
    content: ".";
    color: #6209DB;
  }
`;

const FeatureContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow: hidden;

  &:hover > div > .botones {
    transform: translateY(30px);
  }
`;

const IndexContainer = styled.div`
  min-width: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  position: relative;
`;

const FeatureIndex = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #660BE1;
  background-color: #FFFFFF;
  z-index: 1;
`;

const FeatureLine = styled.span`
  height: 60px;
  border-left: 1px solid #D9D9D9;
`;

const FeatureTitle = styled.h2`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  width: 350px;
  font-size: 16px;
  font-weight: 400;
`;