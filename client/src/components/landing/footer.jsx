import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PurpleDiv = styled.div`
  background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
  border-radius: 25px;
  width: 1000px;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const OpenYourAccount = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 138.4%;
  color: #FFFFFF;
`;

const OpenP = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #FFFFFF;
`;

const InputDiv = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: calc(490px - 186.3px);
  height: 82px;
  padding: 30px 20px;
  font-weight: 400;
  border-radius: 6px 0 0 6px;
  border: none;
  outline: none;
`;

const DivButtonInput = styled.div`
  border-radius: 0 6px 6px 0;
  height: 82px;
  background-color: #FFFFFF;
  padding: 10px;
`;

const OpenAccountButton = styled.button`
  border: none;
  width: fit-content;
  background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
  border-radius: 6px;
  padding: 20px;
  color: #FFFFFF;
  font-weight: 300;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    filter: grayscale(0.2);
  }
`;

const FooterInfo = styled.div`
  width: 80%;
  display: flex;
  margin-bottom: 27px;

  & > div {
    width: 100%;
  }
`;

const FooterColumn = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ColumnTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
`;

const OptionLink = styled(Link)`
  width: fit-content;
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

const ColumnInfo = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const IconsDiv = styled.div`
  display: flex;
  gap: 23px;
`;

const IconA = styled.a`
  text-decoration: none;
  font-size: 21px;
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
`;

const Rights = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

const Footer = () => {
  return (
    <Container>
      <PurpleDiv>
        <OpenYourAccount>Abre tu cuenta hoy</OpenYourAccount>
        <OpenP>Es rápido y sencillo, te tomará menos de 2 minutos</OpenP>
        <InputDiv>
          <Input placeholder='Ingresa tu correo electrónico' />
          <DivButtonInput>
            <OpenAccountButton>Abre tu cuenta hoy</OpenAccountButton>
          </DivButtonInput>
        </InputDiv>
      </PurpleDiv>
      <FooterInfo>
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