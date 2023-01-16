import styled from "styled-components";
import ImagenLogin from '../../assets/login/imglogin.png';
import { Link } from "react-router-dom";
import { device } from "../globals/devices";
import { theme } from "../globals/themes";

export const DivPrincipal = styled.div`
  display: flex;
  text-align: center;
  height: ${props => props.height};
  overflow: hidden;

  position: relative;

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

export const DivImagelog = styled.div`
  width: 145%;
  height: 100%;
`;

export const DivItemlog = styled.div`
  height: 100%;
  background: url(${ImagenLogin}) no-repeat;
  background-size: cover;
  background-position-y: center;
  background-color: ${theme.principal};

  @media ${device.tablet} {
    background-position-y: top;
  }
`;

export const DivFormlog = styled.div`
  background-color: ${theme.principal};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
  overflow: auto;
  overflow-x: hidden;
  padding-top: 90px;

  @media ${device.tablet} {
    padding: 40px;
    max-height: 70vh;
    margin-top: 45px;
    border-radius: 10px;
    background-color: rgb(${theme.principalRGB}, 0.7);
    backdrop-filter: blur(5px);
    width: max-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
`;

export const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin: auto 0;
  
  & > form {
    width: 250px;
    display: flex;
    flex-direction: column;
  }
`;

export const H1Title = styled.h1`
  font-size: 60px;
  font-weight: 700;
  color: ${theme.textDark};
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;

  &::after {
    content: "";
    width: 96px;
    border-top: 2px solid ${theme.colorPrincipalLight};
    background-color: ${theme.textDark};
    transition: all 0.2s;
  }

  &:hover::after {
    width: 150px;
  }

  @media ${device.tablet} {
    height: max-content;
    padding-bottom: 25px;
    justify-content: center;
  }
`;

export const ButtonSubmit = styled.button`
  width: 100%;
  height: 54px;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.principal};
  margin-top: 1rem;

  text-decoration: none;
  border: none;
  cursor: pointer;
  border-radius: 27px;
  background: ${theme.colorPrincipalLight};
  box-shadow: 0px 0px 50px 0px rgb(0 0 0 / 10%);
  transition: all 0.2s;

  &:hover {
    filter: grayscale(0.2);
  }

  background: ${props => props.load && "linear-gradient(90deg, rgba(" + theme.colorPrincipalLightRGB + ",1) 0%, rgba(" + theme.colorPrincipalLighterRGB + ",1) 50%, rgba(" + theme.colorPrincipalLightRGB + ",1) 100%)"};
  animation: animate 1.5s ease infinite;

  @keyframes animate {
    0% {
      background-position-x: 125px;
    }
    50% {
      background-position-x: 125px;
    }
    100% {
      background-position-x: 0;
    }
  }
`;

export const GoToDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const GoToContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const GoToDescription = styled.p`
  color: ${theme.textDark};
  font-size: 12px;
  font-weight: 400;
`;

export const Instructions = styled.p`
  color: ${props => props.alert ? "red" : theme.textDark};
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
`;

export const GoToText = styled(Link)`
  color: ${theme.colorPrincipalLight};
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
`;

// INPUTS

export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const DivInputsNumber = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const DivInputBox = styled.div`
  position: relative;
  width: 100%;
`;

export const InputText = styled.input`
  width: 100%;
  background: transparent;
  color: ${theme.textPrincipal};
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 1em;
  letter-spacing: 0.1em;
  padding: 10px 0 7px;
  text-align: ${props => props.centerText && "center"};

  &:valid ~ span,
  &:focus ~ span {
    color: ${theme.textBlue};
    transform: translateY(-16px);
    font-size: 0.65em;
  }

  &:valid ~ i::before,
  &:focus ~ i::before {
    left: 0;
  }
`;

export const SpanText = styled.span`
  position: absolute;
  left: 0;
  padding: 10px 0 5px;
  color: ${theme.textPrincipal};
  pointer-events: none;
  letter-spacing: 0.1em;
  transition: 0.5s;
`;

export const IInput = styled.i`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: ${theme.textPrincipal};
  overflow: hidden;
  background: ${props => props.mostrarError && "red"};

  &::before {
    content: "";
    position: absolute;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      ${theme.backgroundYellow},
      ${theme.textRed},
      ${theme.textBlue},
      ${theme.colorPrincipalLight},
      ${theme.backgroundYellow}
    );
    animation: animate ${props => props.lento ? "16s" : "2s"} linear infinite;
  }

  @keyframes animate {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 250px;
    }
  }
`;

export const InputSelect = styled.select`
  width: 250px;
  padding-left: 18px;
  font-size: 16px;
  color: ${theme.principal};
  font-weight: 400;
  height: 45px;
  background-color: ${theme.colorPrincipalLight};
  border-radius: 10px;
  border: none;
  outline: none;
`;

// MODAL REGISTER

export const DivAlerta = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
text-align: center;
gap: 10px;
`;

export const DivAlertaText = styled.div`
display: flex;
flex-direction: column;
height: 250px;
justify-content: space-around;
`;

export const DivIcon = styled.i`
font-size: 100px;
color: ${theme.textBlue};
`;

export const H2Title = styled.h2`
font-size: 1.2rem;
color: ${theme.textDark};
`;

export const PText = styled.p`
font-size: 1rem;
color: ${theme.textPrincipal};
`;

export const DivButtons = styled.div`
display: flex;
justify-content: center;
gap: 20px;
`;

export const ButtonModal = styled.button`
text-decoration: none;
border: none;
text-transform: uppercase;
cursor: pointer;
padding: 0.8rem 2rem;
border-radius: 50px;
font-weight: bold;
font-size: 1rem;
background: linear-gradient(to right, ${theme.textError}, ${theme.textRed});
box-shadow: 0px 0px 50px 0px rgb(0 0 0 / 10%);
color: ${theme.backgroundPrincipal};

&:hover {
  background: linear-gradient(to right, ${theme.colorPrincipalLight}, ${theme.colorPrincipal});
}
`;