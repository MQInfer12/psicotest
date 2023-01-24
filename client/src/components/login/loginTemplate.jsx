import React from 'react'
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { 
  ButtonSubmit, DivContainer, DivFormlog, 
  DivPrincipal, GoToContainer, GoToDescription, GoToDiv, 
  GoToText, H1Title, ImagenStyled, Instructions 
} from '../../styles/pages/login';
import Navbar from '../landing/navbar';
import { useThemeContext } from '../../context/themeContext';
import { Image, Transformation } from 'cloudinary-react';
import ImagenLogin from '../../assets/login/imglogin.png';

const LoginTemplate = ({ children, title, submitButton, handleSubmit, toLogin, toRegister, toRecover, goTo, loading, responseMessage }) => {
  const windowHeight = useWindowHeight();
  const { actualTheme } = useThemeContext();

  const imageStyle = {
    width: "145%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "50% 50%",
    backgroundColor: actualTheme.principal
  };

  return (
    <>
      <Navbar />
      <DivPrincipal height={windowHeight}>
        {/* <Image cloudName="dcy47gguk" publicId="assets/imglogin_iqvyar.png" style={imageStyle} >
          <Transformation quality="65" width="1440" crop="scale" />
        </Image> */}
        <ImagenStyled src={ImagenLogin} />
        <DivFormlog>
          <DivContainer>
            <H1Title>{title}</H1Title>
            <form>
              { children }
              { responseMessage && <Instructions alert>{responseMessage}</Instructions>}
              <ButtonSubmit load={loading} onClick={handleSubmit}>{ loading ? "CARGANDO..." : submitButton}</ButtonSubmit>
            </form>
            <GoToDiv>
              {
                toLogin &&
                <GoToContainer>
                  <GoToDescription>¿Ya tienes una cuenta?</GoToDescription>
                  <GoToText to={goTo ? "/login/" + goTo : "/login"}>Inicia sesión</GoToText>
                </GoToContainer>
              }
              {
                toRegister &&
                <GoToContainer>
                  <GoToDescription>¿No tienes una cuenta?</GoToDescription>
                  <GoToText to={goTo ? "/register/" + goTo : "/register"}>Regístrate</GoToText>
                </GoToContainer>
              }
              {
                toRecover &&
                <GoToContainer>
                  <GoToDescription>¿Te olvidaste tu contraseña?</GoToDescription>
                  <GoToText to={goTo ? "/recover/" + goTo : "/recover"}>Recupérala</GoToText>
                </GoToContainer>
              }
            </GoToDiv>
          </DivContainer>
        </DivFormlog>
      </DivPrincipal>
    </>
  )
}

export default LoginTemplate