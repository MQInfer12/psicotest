import React, { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../styles/devices';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [displayOptions, setDisplayOptions] = useState(false);

  return (
    <Nav>
      <ButtonContainer>
        <TitleLink to="/">
          <PageTitle>Psico Test</PageTitle>
        </TitleLink>
        <DisplayButton onClick={() => setDisplayOptions(!displayOptions)}>
          {
            displayOptions ? 
            <i class="fa-solid fa-xmark"></i> : 
            <i className="fa-solid fa-bars"></i>
          }
        </DisplayButton>
      </ButtonContainer>
      <OptionList display={displayOptions}>
        <li>
          <OptionLink to="/">Inicio</OptionLink>
        </li>
        <li>
          <LoginLink to="/login">Inicia sesión</LoginLink>
        </li>
        <li>
          <RegisterLink to="/register">Registrarse</RegisterLink>
        </li>
      </OptionList>
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
  width: 100vw;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 100px;
  position: fixed;
  z-index: 5;

  @media ${device.laptop} {
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(5px);
  }

  @media ${device.tablet} {
    padding: 0px 20px;
    flex-direction: column;
    height: max-content;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${device.tablet} {
    width: 100%;
    min-height: 90px;
  }
`;

const DisplayButton = styled.button`
  width: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
  border-radius: 6px;
  border: none;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 16px;
  padding: 10px 20px;
  display: none;
  cursor: pointer;

  @media ${device.tablet} {
    display: block;
  }
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
  backdrop-filter: blur(5px);

  @media ${device.laptop} {
    background-color: transparent;
    backdrop-filter: initial;
  }
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
`;

const OptionList = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;

  @media ${device.tablet} {
    padding: 0 0 30px;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    display: ${props => props.display ? "auto" : "none"};
  }
`;

const OptionLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  position: relative;

  &::after {
    content: "";
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid black;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  background: #FFFFFF;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  color: #000000;

  &:hover {
    opacity: 0.7;
  }

  @media ${device.laptop} {
    background: transparent;
  }
`;

const RegisterLink = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    filter: grayscale(0.2);
  }
`;