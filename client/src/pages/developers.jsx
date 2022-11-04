import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/landing/navbar'
import { useWindowHeight } from '../hooks/useWindowHeight';
import MauriPhoto from "../assets/developers/mauri.jpg";
import JosePhoto from "../assets/developers/joseZambrana.jpg";

const AllContainer = styled.div`
  height: ${props => props.height};
  display: flex;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 800px) {
    padding-top: 90px;
    min-height: auto;
    height: max-content;
  }
`;

const ContainerPage = styled.div`
  min-width: 105%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    min-width: 100%;
    display: block;
  }
`;

const Column = styled.div`
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  transform: skewX(-5deg);
  background-color: #f5f5f5;
  display: grid;
  place-content: center;
  padding: 40px;

  &:hover {
    width: calc(100% + 30px);
    background-color: #6209db;

    & .nombres {
      color: #FFFFFF;
    }
  }

  & > div {
    transform: skewX(5deg);
  }

  @media (max-width: 800px) {
    transform: skewX(0);

    & > div {
      transform: skewX(0);
    }

    &:hover {
      width: calc(100%);
    }
  }
`;

const DivInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center; 
`;

const NombreDevs = styled.h2`
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  transition: all 0.5s;
`;

const PhotoDevs = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 30px;
`;

const DescripcionDevs = styled.h3`
  font-size: 16px;
  font-weight: 500;
  transition: all 0.5s;
`;

const ButtonContact = styled.button`
  padding: 10px 20px;
  background-color: #FFFFFF;
  color: #6209db;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const Developers = () => {
  const windowHeight = useWindowHeight();

  return (
    <>
      <Navbar />
      <AllContainer height={windowHeight}>
        <ContainerPage>
          <Column>
            <DivInfo>
              <NombreDevs className='nombres'>Mauricio Molina</NombreDevs>
              <DescripcionDevs className='nombres'>Full Stack Developer</DescripcionDevs>
              <PhotoDevs src={MauriPhoto} />
              <ButtonContact>Contactar</ButtonContact>
            </DivInfo>
          </Column>
          <Column>
            <DivInfo>
              <NombreDevs className='nombres'>Jose Zambrana</NombreDevs>
              <DescripcionDevs className='nombres'>Full Stack Developer</DescripcionDevs>
              <PhotoDevs src={JosePhoto} />
              <ButtonContact>Contactar</ButtonContact>
            </DivInfo>
          </Column>
        </ContainerPage>
      </AllContainer>
    </>
  )
}

export default Developers