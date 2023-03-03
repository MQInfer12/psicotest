import React from 'react'
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { 
  ButtonSubmit, DivContainer, DivFormlog, 
  DivPrincipal, GoToContainer, GoToDescription, GoToDiv, 
  GoToText, H1Title, ImagenStyled, Instructions 
} from '../../styles/pages/login';
import Navbar from '../landing/navbar';
import { useThemeContext } from '../../context/themeContext';
import ImagenLogin from '../../assets/login/imglogin.png';
import { GoogleLogin } from '@react-oauth/google';
import { signInWithGoogle } from '../../services/auth';

const LoginTemplate = ({ 
  children, title, submitButton, 
  handleSubmit, toLogin, toRegister, toRecover, 
  goTo, loading, responseMessage, otherMethods, obtenerPerfil
}) => {
  const windowHeight = useWindowHeight();
  const { actualTheme } = useThemeContext();

  const getGoogleUser = async (res) => {
    const user = await (await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${res.credential}`)).json();
    const response = await signInWithGoogle(user);
    if(response.ok) {
      obtenerPerfil();
    }
  }

  return (
    <>
      <Navbar />
      <DivPrincipal height={windowHeight}>
        <ImagenStyled src={ImagenLogin} />
        <DivFormlog>
          <DivContainer>
            <H1Title>{title}</H1Title>
            <form>
              { children }
              { responseMessage && <Instructions alert>{responseMessage}</Instructions>}
              <ButtonSubmit load={loading} onClick={handleSubmit}>{ loading ? "CARGANDO..." : submitButton}</ButtonSubmit>
            </form>
            {
              otherMethods &&
              <GoogleLogin 
                onSuccess={res => getGoogleUser(res)}
                shape="circle"
                size='medium'
              />
            }
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