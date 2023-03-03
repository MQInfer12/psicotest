import React, { useEffect, useState } from "react";
import FirstSectionImg from "../../assets/landing/womanPhone1.png";
import { getCommits } from "../../services/github";
import { BestPlatform, FirstSectionContainer, Img, 
  ImgClip, InfoContainer, LeftContainer, NewContainer, 
  OpenAccountLink, PlatformInfo, PurpleCircle, RightContainer 
} from "../../styles/pages/landing";

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
    <FirstSectionContainer>
      <LeftContainer>
        <InfoContainer>
          <NewContainer>¡{endCommit}!</NewContainer>
          <BestPlatform>La genial plataforma</BestPlatform>
          <PlatformInfo>
            Dile adiós a las plataformas de test psicológicas convencionales y disfruta de 
            funcionalidades nuevas.
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
    </FirstSectionContainer>
  );
};

export default FirstSection;