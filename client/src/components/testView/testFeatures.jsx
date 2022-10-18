import React from "react";
import styled from "styled-components";
import { DangerIconButton, WhiteButton, WhiteIconButton } from "../../styles/formularios";

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
  gap: 20px;
  width: 272px;
  overflow: hidden;

  &:hover > div > .botones {
    transform: translateY(35px);
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
  transition: all 0.5s;
  transform: translateY(-45px);
`;

const TestFeatures = ({ test }) => {
  return (
    <TestInfoContainer>
      <TestInfoTitle>Características del Test</TestInfoTitle>
      <WhiteButton>Añadir</WhiteButton>
      <Features>
        <FeatureContainer>
          <IndexContainer>
            <FeatureIndex>01</FeatureIndex>
            <FeatureLine></FeatureLine>
            <ButtonContainer className='botones'>
              <WhiteIconButton><i className="fa-solid fa-pencil"></i></WhiteIconButton>
              <DangerIconButton><i className="fa-solid fa-trash-can"></i></DangerIconButton>
            </ButtonContainer>
          </IndexContainer>
          <IndexContainer>
            <FeatureTitle>Mayor eficacia.</FeatureTitle>
            <FeatureDescription>Es muy sencillo, solamente ingresa tu celular y listo.</FeatureDescription>
          </IndexContainer>
        </FeatureContainer>
      </Features>
    </TestInfoContainer>
  )
}

export default TestFeatures;