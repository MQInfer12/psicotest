import React from 'react'
import Navbar from '../components/landing/navbar'
import { useWindowHeight } from '../hooks/useWindowHeight';
import MauriPhoto from "../assets/developers/mauri.jpg";
import JosePhoto from "../assets/developers/joseZambrana.jpg";
import { useEffect } from 'react';
import { AllContainer, ButtonContact, Column, ContainerPage, DescripcionDevs, DivInfo, NombreDevs, PhotoDevs } from '../styles/pages/developers';

const Developers = () => {
  const windowHeight = useWindowHeight();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

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
              <ButtonContact href='https://wa.me/59176407344'>Contactar</ButtonContact>
            </DivInfo>
          </Column>
          <Column>
            <DivInfo>
              <NombreDevs className='nombres'>Jose Zambrana</NombreDevs>
              <DescripcionDevs className='nombres'>Full Stack Developer</DescripcionDevs>
              <PhotoDevs src={JosePhoto} />
              <ButtonContact href='https://wa.me/59165722183'>Contactar</ButtonContact>
            </DivInfo>
          </Column>
        </ContainerPage>
      </AllContainer>
    </>
  )
}

export default Developers