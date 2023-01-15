import React from "react";
import { ColumnA, ColumnTitle, FooterColumn, FooterContainer, FooterInfo, FooterLinks, FooterOptionLink, FooterRights, IconA, IconsDiv, Rights } from "../../styles/pages/landing";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInfo>
        <FooterColumn>
          <FooterLinks>
            <ColumnTitle>Inicio</ColumnTitle>
            <FooterOptionLink to="/">Página principal</FooterOptionLink>
            <FooterOptionLink to="/login">Inicia sesión</FooterOptionLink>
            <FooterOptionLink to="/register">Crea una cuenta</FooterOptionLink>
          </FooterLinks>
        </FooterColumn>
        <FooterColumn>
          <FooterLinks>
            <ColumnTitle>Empresa</ColumnTitle>
            <FooterOptionLink to="/developers">Desarrolladores</FooterOptionLink>
          </FooterLinks>
        </FooterColumn>
        <FooterColumn>
          <FooterLinks>
            <ColumnTitle>Productos</ColumnTitle>
            <FooterOptionLink to="#">Psicotest</FooterOptionLink>
          </FooterLinks>
        </FooterColumn>
        <FooterColumn>
          <FooterLinks>
            <ColumnTitle>Unifranz</ColumnTitle>
            <ColumnA href="https://goo.gl/maps/CW4T8kaLciFi9ErW6">
              Av. Gualberto Villarroel y Tomás Oconor
            </ColumnA>
            <IconsDiv>
              <IconA href="https://www.facebook.com/unifranz.edu">
                <i className="fa-brands fa-facebook"></i>
              </IconA>
              <IconA href="https://www.instagram.com/unifranz/">
                <i className="fa-brands fa-instagram"></i>
              </IconA>
              <IconA href="https://www.tiktok.com/@unifranz.oficial">
                <i className="fa-brands fa-tiktok"></i>
              </IconA>
              <IconA href="https://twitter.com/UnifranzBolivia">
                <i className="fa-brands fa-twitter"></i>
              </IconA>
            </IconsDiv>
          </FooterLinks>
        </FooterColumn>
      </FooterInfo>
      <FooterRights>
        <Rights>© 2022 Psicotest / CIDTEC y todos los derechos reservados</Rights>
      </FooterRights>
    </FooterContainer>
  );
};

export default Footer;