import styled from "styled-components";
import { theme } from "../globals/themes";

export const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  min-height: ${props => props.height};
`;

export const Paragraph = styled.p`
  max-width: 500px;
  font-size: 20px;
  font-weight: 300;
  line-height: 175%;
  padding: 0 20px;
  color: ${theme.textDark};

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const TestTextContainer = styled.div`
  width: 100%;
  text-align: justify;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 50px;
`;

export const TestTitle = styled.h2`
  height: 30px;
  gap: 4px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colorPrincipal};

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const TestContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${theme.principal};
  padding: 40px;
  gap: 40px;

  @media (max-width: 500px) {
    padding: 40px 20px;
  }
`;

// TEST FEATURES

export const TestInfoContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const TestInfoTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colorPrincipal};

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const Features = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

// FEATURE CARD

export const FeatureContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 272px;
  overflow: hidden;
  color: ${theme.textDark};

  &:hover > div > .botones {
    transform: translateY(30px);
  }
`;

export const IndexContainer = styled.div`
  min-width: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  position: relative;
`;

export const FeatureIndex = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colorPrincipal};
  background-color: ${theme.principal};
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const FeatureLine = styled.span`
  height: 60px;
  border-left: 1px solid ${theme.textSecondary};
`;

export const FeatureTitle = styled.h2`
  width: 100%;
  font-size: 20px;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const FeatureDescription = styled.p`
  font-size: 16px;
  font-weight: 400;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  position: absolute;
  top: 0;
  transition: all 0.5s;
  transform: translateY(-45px);
`;

// TEST RESOLUTION

export const TestResolutionContainer = styled.div`
  background-color: ${theme.principal};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ResolutionTitle = styled.h1`
  font-size: 60px;
  font-weight: 600;
  padding-bottom: 16px;
  text-align: center;
  width: fit-content;
  color: ${theme.textDark};

  &::after {
    content: ".";
    color: ${theme.colorPrincipal};
  }

  @media (max-width: 600px) {
    font-size: 48px;
    line-height: 60px;
  }
`;

export const StartText = styled.h4`
  font-size: 20px;
  font-weight: 400;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const StartTextPurple = styled.h4`
  font-size: 20px;
  font-weight: 400;
  color: ${theme.colorPrincipal};

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const TestResolveContainer = styled.div`
  margin-top: 40px;
  background: ${theme.colorPrincipal};
  border-radius: 15px;
  color: #EAEAEA;
  position: relative;
  overflow: hidden;
`;

export const PreguntasContainer = styled.div`
  min-height: 471px;
  height: max-content;
  display: flex;
  overflow: hidden;
`;

export const UnaPreguntaContainer = styled.div`
  transform: translateX(${(props) => props.translate * -100}%);
  min-width: 100%;
  padding: 40px;
  gap: 36px;
  display: flex;
  transition: all 1s;

  @media (max-width: 1260px) {
    flex-direction: column;
    gap: 16px;
    padding: 24px;
  }
`;

export const PreguntaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`;

export const PreguntaIndex = styled.h2`
  font-weight: 600;
  font-size: 24px;
`;

export const Pregunta = styled.h3`
  font-weight: 600;
  font-size: 24px;

  @media (max-width: 1260px) {
    font-size: 18px;
  }

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const ReactivosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

// RADIO BUTTON

export const ReactivoContainer = styled.div`
  min-height: 62px;
  width: 100%;
  padding: 0px 40px;
  display: flex;
  align-items: center;
  gap: 30px;
  border: 1px solid ${theme.textSecondary};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  user-select: none;
  cursor: pointer;
  background-color: ${theme.colorPrincipal};
  transition: all 0.2s;

  &:hover {
    background-color: ${theme.colorPrincipal};
  }

  @media (max-width: 1260px) {
    font-size: 16px;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const CheckContainer = styled.div`
  position: relative;
  min-width: 36px;
  height: 36px;
  top: 0;
  left: 0;
  pointer-events: none;

  & label {
    width: 36px;
    height: 36px;
    background: none;
    border-radius: ${props => props.multimarcado ? "10%" : "50%"};
    position: absolute;
    top: 0;
    left: 0;
    -webkit-filter: url("#goo");
    filter: url("#goo");
    transform: translate3d(${theme.textDarkRGB});
    pointer-events: none;
  }

  & svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    pointer-events: none;
  }

  & svg path {
    stroke: ${theme.principal};
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 19;
    stroke-dashoffset: 19;
    transition: stroke-dashoffset 0.3s ease;
    transition-delay: 0.2s;
  }
`;

export const Checkbox = styled.input`
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border: 2px solid #bfbfc0;
  border-radius: ${props => props.multimarcado ? "10%" : "50%"};

  &:focus {
    outline: 0;
  }

  &:checked + label {
    animation: splash 0.6s ease forwards;
  }

  &:checked + label + svg path {
    stroke-dashoffset: 0;
  }

  @keyframes splash {
    40% {
      box-shadow: 
        0 -18px 0 -8px rgb(${theme.colorPrincipalLighterRGB}, 0.7), 
        16px -8px 0 -8px rgb(${theme.colorPrincipalLighterRGB}, 0.7), 
        16px 8px 0 -8px rgb(${theme.colorPrincipalLighterRGB}, 0.7), 
        0 18px 0 -8px rgb(${theme.colorPrincipalLighterRGB}, 0.7), 
        -16px 8px 0 -8px rgb(${theme.colorPrincipalLighterRGB}, 0.7), 
        -16px -8px 0 -8px rgb(${theme.colorPrincipalLighterRGB}, 0.7);
    }
    100% {
      background: ${theme.colorPrincipalLighter};
      box-shadow: 
        0 -36px 0 -10px transparent, 
        32px -16px 0 -10px transparent, 
        32px 16px 0 -10px transparent, 
        0 36px 0 -10px transparent, 
        -32px 16px 0 -10px transparent, 
        -32px -16px 0 -10px transparent;
    }
  }
`;

// PAGE SLIDER

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 40px;
  justify-content: space-between;
  border-top: 1px solid ${theme.textSecondary};
  gap: 15px;

  @media (max-width: 1260px) {
    background-color: ${theme.colorPrincipal};
    padding: 17px 20px;
    height: max-content;
    border-top: none;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 15px;
  }
`;

export const ButtonTransparent = styled.button`
  background-color: ${theme.colorPrincipalLighter};
  border: 1px solid ${theme.textSecondary};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  gap: 25px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
  
  &:hover {
    filter: grayscale(0.4);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const IconButton = styled.div`
  font-size: 18px;
  color: ${theme.textSecondary};
`;

export const PButton = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.textSecondary};

  @media (max-width: 1260px) {
    display: none;
  }
`;

// TESTVIEW CHAT

export const TestViewChatContainer = styled.div`
  width: 100%;
  padding: 0 40px 40px;
  background-color: ${theme.principal};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 500px) {
    padding: 0px 20px 40px;
  }
`;