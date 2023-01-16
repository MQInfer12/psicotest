import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../globals/devices";
import { theme } from "../globals/themes";

// NAVBAR

export const Nav = styled.nav`
  width: 100vw;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 100px;
  position: fixed;
  z-index: 5;

  @media ${device.laptop} {
    background-color: rgba(${theme.principalRGB}, 0.6);
    backdrop-filter: blur(5px);
  }

  @media ${device.tablet} {
    padding: 0px 20px;
    flex-direction: column;
    height: max-content;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${device.tablet} {
    width: 100%;
    min-height: 90px;
  }
`;

export const DisplayButton = styled.button`
  width: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, ${theme.colorPrincipal} 0%, ${theme.colorPrincipalLight} 100%);
  border-radius: 6px;
  border: none;
  color: ${theme.principal};
  font-weight: 600;
  font-size: 16px;
  padding: 10px 20px;
  display: none;
  cursor: pointer;

  @media ${device.tablet} {
    display: block;
  }
`;

export const TitleLink = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  background-color: rgba(${theme.principalRGB}, 0.6);
  border-radius: 6px;
  backdrop-filter: blur(5px);

  @media ${device.laptop} {
    background-color: transparent;
    backdrop-filter: initial;
  }
`;

export const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 300;
  color: ${theme.textDark};
  display: flex;
  gap: 10px;
  align-items: center;

  & img {
    height: 35px;
  }

  & span {
    font-weight: 600;
  }
`;

export const OptionList = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;

  @media ${device.tablet} {
    padding: 0 0 30px;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    display: ${props => props.open ? "auto" : "none"};
  }
`;

export const OptionLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  color: ${theme.textDark};
  position: relative;

  &::after {
    content: "";
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid ${theme.textDark};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

export const LoginLink = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  background: ${theme.principal};
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  color: ${theme.textDark};

  &:hover {
    opacity: 0.7;
  }

  @media ${device.laptop} {
    background: transparent;
  }
`;

export const RegisterLink = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  background: linear-gradient(180deg, ${theme.colorPrincipal} 0%, ${theme.colorPrincipalLight} 100%);
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  color: #FFFFFF;

  &:hover {
    filter: grayscale(0.2);
  }
`;

// FIRST SECTION

export const FirstSectionContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: ${theme.principal};
  color: ${theme.textDark};

  @media ${device.laptop} {
    flex-direction: column;
  }
`;

export const LeftContainer = styled.div`
  padding: 30px;
  padding-top: 90px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.principal};
`;

export const InfoContainer = styled.div`
  max-width: 443px;
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    transform: scale(0.8);
  }
`;

export const NewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 400;
  color: ${theme.colorPrincipal};
  padding-bottom: 10px;

  &::before {
    content: "Nuevo";
    padding: 4px 6px;
    color: ${theme.principal};
    background: linear-gradient(180deg, ${theme.colorPrincipal} 0%, ${theme.colorPrincipalLight} 100%);
    border-radius: 6px;
  }
`;

export const BestPlatform = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 138.4%;
  padding-bottom: 30px;

  &::after {
    content: ".";
    color: ${theme.colorPrincipal};
  }
`;

export const PlatformInfo = styled.h3`
  font-size: 20px;
  font-weight: 400;
  padding-bottom: 30px;
`;

export const OpenAccountLink = styled(Link)`
  text-decoration: none;
  width: fit-content;
  background: linear-gradient(180deg, ${theme.colorPrincipal} 0%, ${theme.colorPrincipalLight} 100%);
  border-radius: 6px;
  padding: 20px;
  color: ${theme.principal};
  font-weight: 300;
  transition: all 0.3s;
  color: #FFFFFF;

  &:hover {
    filter: grayscale(0.2);
  }
`;

export const RightContainer = styled.div`
  padding: 10px;
  padding-top: 90px;
  min-width: 350px;
  width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.backgroundPrincipal};
  border-radius: 0 0 0 50px;

  @media ${device.laptop} {
    padding: 40px 10px;
    width: 100%;
  }
`;

export const PurpleCircle = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(180deg, ${theme.colorPrincipal} 0%, ${theme.colorPrincipalLight} 100%);
  position: relative;

  @media (max-width: 520px) {
    width: 350px;
    height: 350px;
  }
`;

export const ImgClip = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  border-radius: 0 0 50% 50%;
  overflow: hidden;
`;

export const Img = styled.img`
  @media (max-width: 520px) {
    width: 218.75px;
  }
`;

// SECOND SECTION

export const SecondSectionContainer = styled.div`
  padding: 60px 0;
  display: flex;
  background-color: ${theme.principal};
  color: ${theme.textDark};

  @media ${device.laptop} {
    flex-direction: reverse;
  }
`;

export const ColumnContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.principal};
  padding: 10px;

  @media ${device.laptop} {
    &:first-child {
      display: none;
    }
  }
`;

export const PurpleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 40px;
  width: 500px;
  height: 600px;
  background: linear-gradient(180deg, ${theme.colorPrincipal} 0%, ${theme.colorPrincipalLight} 100%);
  border-radius: 50px;
  overflow: hidden;
`;

export const YouDecide = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 138.4%;
  color: ${theme.principal};
`;

export const SecondInfoContainer = styled.div`
  width: 482px;
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    transform: scale(0.8);
  }
`;

export const MakeYourTests = styled.h2`
  font-size: 60px;
  font-weight: 700;
  padding-bottom: 40px;
  line-height: 138.4%;

  &::after {
    content: ".";
    color: ${theme.colorPrincipal};
  }
`;

export const FeatureContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow: hidden;

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
`;

export const FeatureLine = styled.span`
  height: 60px;
  border-left: 1px solid ${theme.textSecondary};
`;

export const FeatureTitle = styled.h2`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
`;

export const FeatureDescription = styled.p`
  width: 350px;
  font-size: 16px;
  font-weight: 400;
`;

// THIRD SECTION

export const ThirdSectionContainer = styled.div`
  padding: 60px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.principal};
  color: ${theme.textDark};
`;

export const GrayDiv = styled.div`
  min-height: 535px;
  width: 1200px;
  background-color: ${theme.backgroundPrincipal};
  border-radius: 50px;
  padding: 50px 20px;
  display: flex;
  justify-content: space-around;

  @media ${device.laptop} {
    width: max-content;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
    gap: 20px;
  }
`;

export const LeftDiv = styled.div`
  max-width: 590px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  
  @media ${device.laptop} {
    gap: 30px;
    transform: scale(0.7);

    & > a {
      align-self: center;
    }
  }
`;

export const SendResponses = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 138.4%;

  &::after {
    content: ".";
    color: ${theme.colorPrincipal};
  }
`;

export const LeftInfo = styled.p`
  width: 99%;
  font-size: 20px;
  font-weight: 400;
`;

export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const ThirdPurpleCircle = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: linear-gradient(180deg, ${theme.colorPrincipal} 0%, ${theme.colorPrincipalLight} 100%);
  position: relative;
`;

export const ThirdImgClip = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 110%;
  display: flex;
  justify-content: center;
  border-radius: 0 0 175px 175px;
  overflow: hidden;
`;

// FOURTH SECTION

export const FourthSectionContainer = styled.div`
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.principal};
`;

export const FourthPurpleDiv = styled.div`
  background: linear-gradient(180deg, ${theme.colorPrincipal} 0%, ${theme.colorPrincipalLight} 100%);
  border-radius: 25px;
  width: 100%;
  max-width: 1000px;
  padding: 30px 20px;
  text-align: center;
`;

export const FourthInfoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;

  @media ${device.laptop} {
    transform: scale(0.8);
  }
`;

export const OpenYourAccount = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 138.4%;
  color: #FFFFFF;
`;

export const OpenP = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #FFFFFF;
`;

export const InputDiv = styled.div`
  display: flex;
  min-height: 82px;
`;

export const Input = styled.input`
  width: calc(490px - 186.3px);
  padding: 30px 20px;
  font-weight: 400;
  border-radius: 6px 0 0 6px;
  border: none;
  outline: none;
  background-color: ${theme.principal};
  color: ${theme.textDark};

  &::placeholder{
    color: ${theme.textDark};
  }
`;

export const DivButtonInput = styled.div`
  border-radius: 0 6px 6px 0;
  background-color: ${theme.principal};
  padding: 10px;
`;

export const OpenAccountButton = styled.button`
  border: none;
  width: fit-content;
  background: linear-gradient(180deg, ${theme.colorPrincipal} 0%, ${theme.colorPrincipalLight} 100%);
  border-radius: 6px;
  padding: 20px;
  color: ${theme.principal};
  font-weight: 300;
  transition: all 0.3s;
  cursor: pointer;
  color: #FFFFFF;

  &:hover {
    filter: grayscale(0.2);
  }
`;

// FOOTER

export const FooterContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.principal};
  color: ${theme.textDark};
`;

export const FooterInfo = styled.div`
  width: 80%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 27px;

  & > div {
    width: 100%;
  }

  @media ${device.laptop} {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const FooterColumn = styled.div`
  display: flex;
  justify-content: center;
`;

export const FooterLinks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ColumnTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
`;

export const FooterOptionLink = styled(Link)`
  width: fit-content;
  text-decoration: none;
  font-size: 12px;
  font-weight: 400;
  color: ${theme.textDark};
  position: relative;

  &::after {
    content: "";
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid ${theme.textDark};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

export const ColumnA = styled.a`
  width: fit-content;
  text-decoration: none;
  font-size: 12px;
  font-weight: 400;
  color: ${theme.textDark};
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid ${theme.textDark};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

export const IconsDiv = styled.div`
  display: flex;
  gap: 23px;
`;

export const IconA = styled.a`
  text-decoration: none;
  font-size: 16px;
  color: ${theme.textDark};
  transition: all 0.4s;

  &:hover {
    color: ${theme.colorPrincipal};
  }
`;

export const FooterRights = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(${theme.textDarkRGB}, 0.1);
  padding-top: 20px;
  gap: 20px;
`;

export const Rights = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

// ARTICLES SECTION

export const ArticlesSectionContainer = styled.div`
  padding: 40px;
  background-color: ${theme.backgroundPrincipal};
`;

export const ArticlesTitleText = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 138.4%;
  padding-bottom: 30px;

  &::after {
    content: ".";
    color: ${theme.colorPrincipal};
  }
`;

export const ArticleContainer = styled.div`
  overflow: auto;
  padding: 20px;
`;