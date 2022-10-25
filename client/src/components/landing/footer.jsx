import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles/devices';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Container>
      <FooterInfo>
        <FooterColumn>
          <FooterLinks>
            <ColumnTitle>Inicio</ColumnTitle>
            <OptionLink to="#">Tarjeta de débito</OptionLink>
            <OptionLink to="#">Tarjeta de crédito</OptionLink>
            <OptionLink to="#">Créditos hipotecarios</OptionLink>
          </FooterLinks>
        </FooterColumn>
        <FooterColumn>
          <FooterLinks>
            <ColumnTitle>Empresa</ColumnTitle>
            <OptionLink to="#">Acerca</OptionLink>
            <OptionLink to="#">Tarjeta de crédito</OptionLink>
            <OptionLink to="#">Créditos hipotecarios</OptionLink>
          </FooterLinks>
        </FooterColumn>
        <FooterColumn>
          <FooterLinks>
            <ColumnTitle>Productos</ColumnTitle>
            <OptionLink to="#">Tarjeta de débito</OptionLink>
            <OptionLink to="#">Tarjeta de crédito</OptionLink>
            <OptionLink to="#">Créditos hipotecarios</OptionLink>
          </FooterLinks>
        </FooterColumn>
        <FooterColumn>
          <FooterLinks>
            <ColumnTitle>Psico Test.</ColumnTitle>
            <ColumnInfo>Av. Gualberto Villarroel y Tomás Oconor</ColumnInfo>
            <IconsDiv>
              <IconA href="https://www.facebook.com/unifranz.edu"><i className="fa-brands fa-facebook"></i></IconA>
              <IconA href="https://www.instagram.com/unifranz/"><i className="fa-brands fa-instagram"></i></IconA>
              <IconA href="https://www.tiktok.com/@unifranz.oficial"><i className="fa-brands fa-tiktok"></i></IconA>
              <IconA href="https://twitter.com/UnifranzBolivia"><i className="fa-brands fa-twitter"></i></IconA>
            </IconsDiv>
          </FooterLinks>
        </FooterColumn>
      </FooterInfo>
      <FooterRights>
        <Rights>2022 PsicoTest y todos los derechos reservados</Rights>
        <Rights>Términos y condiciones</Rights>
      </FooterRights>
    </Container>
  )
}

export default Footer

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterInfo = styled.div`
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
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const FooterColumn = styled.div`
  display: flex;
  justify-content: center;
`;

const FooterLinks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ColumnTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
`;

const OptionLink = styled(Link)`
  width: fit-content;
  text-decoration: none;
  font-size: 12px;
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

const ColumnInfo = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

const IconsDiv = styled.div`
  display: flex;
  gap: 23px;
`;

const IconA = styled.a`
  text-decoration: none;
  font-size: 16px;
  color: #000000;
  transition: all 0.4s;

  &:hover {
    color: #6209DB;
  }
`;

const FooterRights = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  gap: 20px;
`;

const Rights = styled.p`
  font-size: 12px;
  font-weight: 400;
`;