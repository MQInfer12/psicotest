import React from "react";
import styled from "styled-components";
import { DangerIconButton, WhiteIconButton } from "../../styles/formularios";

const TestInfoContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  min-width: 427px;
  padding: 40px 0px;
  background-color: #FFFFFF;
`;

const TestInfoTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #660BE1;
`;

const Features = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FeatureContainer = styled.div`
  display: flex;
  gap: 30px;
  width: 272px;
`;

const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  position: relative;
`;

const FeatureIndex = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #660BE1;
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
  font-size: 16px;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 0;
`;

const TestFeatures = ({ test }) => {
  return (
    <TestInfoContainer>
      <TestInfoTitle>Características del Test</TestInfoTitle>
      <Features>
        <FeatureContainer>
          <IndexContainer>
            <FeatureIndex>01</FeatureIndex>
            <FeatureLine></FeatureLine>
            <ButtonContainer>
              <WhiteIconButton><i className="fa-solid fa-pencil"></i></WhiteIconButton>
              <DangerIconButton><i className="fa-solid fa-trash-can"></i></DangerIconButton>
            </ButtonContainer>
          </IndexContainer>
          <IndexContainer>
            <FeatureTitle>Mayor eficacia.</FeatureTitle>
            <FeatureDescription>Es muy sencillo, solamente ingresa tu celular y listo.</FeatureDescription>
          </IndexContainer>
        </FeatureContainer>
        <FeatureContainer>
          <IndexContainer>
            <FeatureIndex>02</FeatureIndex>
            <FeatureLine></FeatureLine>
          </IndexContainer>
          <IndexContainer>
            <FeatureTitle>Menor tiempo.</FeatureTitle>
            <FeatureDescription>Selecciona el color que más te guste para tu tarjeta, la enviaremos a tu domicilio.</FeatureDescription>
          </IndexContainer>
        </FeatureContainer>
        <FeatureContainer>
          <IndexContainer>
            <FeatureIndex>03</FeatureIndex>
            <FeatureLine></FeatureLine>
          </IndexContainer>
          <IndexContainer>
            <FeatureTitle>Mayor control.</FeatureTitle>
            <FeatureDescription>Inicia sesión en la app e ingresa el número de la tarjeta.</FeatureDescription>
          </IndexContainer>
        </FeatureContainer>
        <FeatureContainer>
          <IndexContainer>
            <FeatureIndex>04</FeatureIndex>
            <FeatureLine></FeatureLine>
          </IndexContainer>
          <IndexContainer>
            <FeatureTitle>Mayor control.</FeatureTitle>
            <FeatureDescription>Inicia sesión en la app e ingresa el número de la tarjeta.</FeatureDescription>
          </IndexContainer>
        </FeatureContainer>
        <FeatureContainer>
          <IndexContainer>
            <FeatureIndex>05</FeatureIndex>
            <FeatureLine></FeatureLine>
          </IndexContainer>
          <IndexContainer>
            <FeatureTitle>Mayor control.</FeatureTitle>
            <FeatureDescription>Inicia sesión en la app e ingresa el número de la tarjeta.</FeatureDescription>
          </IndexContainer>
        </FeatureContainer>
      </Features>
    </TestInfoContainer>
  )
}

export default TestFeatures;