import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  width: 100vw;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 100px;
  position: fixed;
  z-index: 5;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

const OptionList = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;
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

const Navbar = () => {
  return (
    <Nav>
      <PageTitle>Psico Test</PageTitle>
      <OptionList>
        <li>
          <OptionLink to="#">Inicio</OptionLink>
        </li>
        <li>
          <OptionLink to="#">Funcionalidades</OptionLink>
        </li>
        <li>
          <OptionLink to="#">Contacto</OptionLink>
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