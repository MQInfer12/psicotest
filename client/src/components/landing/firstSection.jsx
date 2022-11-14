import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/globals/devices";
import FirstSectionImg from "../../assets/landing/womanPhone.png";
import { getCommits } from "../../services/github";

const FirstSection = () => {
  const [endCommit, setEndCommit] = useState("");

  const handleGetCommit = async () => {
    const res = await getCommits();
    const auxMsg = res[0].commit.message;
    setEndCommit(auxMsg);
  };

  useEffect(() => {
    handleGetCommit();
  }, []);

  return (
    <Container>
      <LeftContainer>
        <InfoContainer>
          <NewContainer>¡{endCommit}!</NewContainer>
          <BestPlatform>La genial plataforma</BestPlatform>
          <PlatformInfo>
            Dile adiós a las plataformas de test psicológicas convencionales y disfruta de las
            funcionalidades por parte de Unifranz.
          </PlatformInfo>
          <OpenAccountLink to="/register">Registra tu cuenta hoy</OpenAccountLink>
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
  );
};

export default FirstSection;

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
  background-color: #ffffff;
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
  color: #6209db;
  padding-bottom: 10px;

  &::before {
    content: "Nuevo";
    padding: 4px 6px;
    color: #ffffff;
    background: linear-gradient(180deg, #6209db 0%, #7613fd 100%);
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
    color: #6209db;
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
  background: linear-gradient(180deg, #6209db 0%, #7613fd 100%);
  border-radius: 6px;
  padding: 20px;
  color: #ffffff;
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
  background-color: #f5f5f5;
  border-radius: 0 0 0 50px;

  @media ${device.laptop} {
    padding: 40px 10px;
    width: 100%;
  }
`;

const PurpleCircle = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(180deg, #6209db 0%, #7613fd 100%);
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
