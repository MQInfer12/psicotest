import React from 'react'
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { ButtonSubmit, DivContainer, DivFormlog, DivImagelog, DivItemlog, DivPrincipal, GoToContainer, GoToDescription, GoToDiv, GoToText, H1Title, Instructions } from '../../styles/pages/login';
import Navbar from '../landing/navbar';

const LoginTemplate = ({ children, title, submitButton, handleSubmit, toLogin, toRegister, toRecover, goTo, loading, responseMessage }) => {
  const windowHeight = useWindowHeight();
  return (
    <>
      <Navbar />
      <DivPrincipal height={windowHeight}>
        <DivImagelog>
          <DivItemlog></DivItemlog>
        </DivImagelog>
        <DivFormlog>
          <DivContainer>
            <H1Title>{title}</H1Title>
            <form>
              { children }
              { responseMessage && <Instructions alert>{responseMessage}</Instructions>}
              <ButtonSubmit loading={loading} onClick={handleSubmit}>{ loading ? "CARGANDO..." : submitButton}</ButtonSubmit>
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