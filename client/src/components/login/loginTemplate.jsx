import React from 'react'
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { ButtonSubmit, DivButton, DivFormlog, DivImagelog, DivItemlog, DivPrincipal, GoToContainer, GoToDescription, GoToText, H1Title } from '../../styles/pages/login';
import Navbar from '../landing/navbar';

const LoginTemplate = ({ children, title, haveAcountText, haveAcountLink, haveAcountButton, submitButton,handleSubmit }) => {
  const windowHeight = useWindowHeight();
  return (
    <>
      <Navbar />
      <DivPrincipal height={windowHeight}>
        <DivImagelog>
          <DivItemlog></DivItemlog>
        </DivImagelog>
        <DivFormlog>
          <form>
            <H1Title>{title}</H1Title>
            { children }
            <GoToContainer>
              <GoToDescription>{haveAcountText}</GoToDescription>
              <GoToText to={haveAcountLink}>{haveAcountButton}</GoToText>
            </GoToContainer>
            <DivButton>
              <ButtonSubmit onClick={handleSubmit}>{submitButton}</ButtonSubmit>
            </DivButton>
          </form>
        </DivFormlog>
      </DivPrincipal>
    </>
  )
}

export default LoginTemplate