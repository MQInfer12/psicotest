import React from "react";
import MauriPhoto from "../assets/developers/mauri.jpg";
import JosePhoto from "../assets/developers/joseZambrana.jpg";
import styled from "styled-components";
import Navbar from "../components/landing/navbar";

const Container = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;
`;
const Title = styled.h2`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 32px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-align: center;
  padding: 10px;
`;
const Cardontaner = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 630px) {
    flex-direction: column;
  }
`;
const Card = styled.div`
  width: auto;
  text-align: center;
  margin-right: 30px;
  margin-top: 30px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 100%;
  }
`;
const Name = styled.h3`
  color: #000;
  font-weight: bold;
  font-size: 22px;
`;
const Des = styled.p`
  color: #000;
  font-size: 18px;
  margin-bottom: 10px;
`;
const OpenAccountButton = styled.a`
  border: none;
  width: fit-content;
  background: linear-gradient(180deg, #6209db 0%, #7613fd 100%);
  border-radius: 6px;
  padding: 10px;
  color: #ffffff;
  font-weight: 300;
  transition: all 0.3s;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    filter: grayscale(0.5);
  }
`;
const Developers = () => {
  const apiWhatsap = "https://api.whatsapp.com/send?phone=";
  return (
    <>
      <Navbar />
      <Container>
        <Title>El proyecto no seria posible si no fuera gracias a:</Title>
        <Cardontaner>
          <Card>
            <img src={MauriPhoto} alt="" />
            <Name>Mauricio Molina</Name>
            <Des>Desarrollador Fullstack</Des>
            <OpenAccountButton
              href={apiWhatsap + "59176407344"}
              target={"_blank"}
            >
              Contactar
            </OpenAccountButton>
          </Card>

          <Card>
            <img src={JosePhoto} alt="" />
            <Name>José Zambrana</Name>
            <Des>Desarrollador Fullstack</Des>
            <OpenAccountButton
              href={apiWhatsap + "59165722183"}
              target={"_blank"}
            >
              Contactar
            </OpenAccountButton>
          </Card>
        </Cardontaner>
      </Container>
    </>
  );
};

export default Developers;
