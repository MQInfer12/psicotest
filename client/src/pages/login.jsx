import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import { initialForm, validationsForm } from "../validations/login";
import styled from "styled-components";
import { device } from "../styles/devices";
import { UseForm } from "../hooks/useForm";
import { getProfile, signIn } from "../services/auth";
import { ErrorCss } from "../styles/formularios";
import ImagenLogin from "../images/imglogin.jpg";
import Navbar from "../components/landing/navbar";
import { useEffect } from "react";

const Login = () => {
  const { goTo } = useParams();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { form, errors, handleChange, handleSubmit } = UseForm(
    initialForm,
    validationsForm,
    signIn,
    async () => {
      const profile = await getProfile();
      setUser(profile);
      navigate(goTo ? goTo.replaceAll("_", "/") : "/dashboard/tests");
    }
  );

  let data = [
    {
      name: "email",
      value: form.email,
      placeholder: "Correo",
      error: errors.email,
    },
    {
      name: "contrasenia",
      value: form.contrasenia,
      placeholder: "Contraseña",
      error: errors.contrasenia,
    },
  ];      

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <DivPrincipal>
        <DivImagelog>
          <DivItemlog></DivItemlog>
        </DivImagelog>
  
        <DivFormlog>
          <form>
            <H1Title>Login</H1Title>
  
            {data.map((v, i) => (
              <DivInputs key={i}>
                <DivInputBox>
                  <InputText
                    required
                    type={v.name != "contrasenia" ? "text" : "password"}
                    name={v.name}
                    onChange={handleChange}
                    value={v.value}
                  />
                  <SpanText>{v.placeholder}</SpanText>
                  <IInput></IInput>
                </DivInputBox>
                {v.error && <ErrorCss>{v.error}</ErrorCss>}
              </DivInputs>
            ))}
            <GoToContainer>
              <GoToDescription>¿No tienes una cuenta?</GoToDescription>
              <GoToText to={goTo ? "/register/" + goTo : "/register"}>Regístrate</GoToText>
            </GoToContainer>
            <DivButton>
              <ButtonSubmit onClick={handleSubmit}>
                LOGIN
              </ButtonSubmit>
            </DivButton>
          </form>
        </DivFormlog>
      </DivPrincipal>
    </>
  );
};

export default Login;

//STYLED COMPONENTS

const DivPrincipal = styled.div`
  display: flex;
  text-align: center;
  min-height: 100vh;
  overflow: hidden;

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const DivImagelog = styled.div`
  width: 145%;
  height: 100vh;
  @media ${device.tablet} {
    height: 50vh;
    filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
  }
`;

const DivItemlog = styled.div`
  height: 100%;
  background: url(${ImagenLogin}) no-repeat;
  background-size: cover;
  background-position-y: center;

  @media ${device.tablet} {
    background-position-y: top;
  }
`;

const DivFormlog = styled.div`
  background-color: #FFFFFF;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 40px;
`;

const H1Title = styled.h1`
  height: 20vh;
  font-size: 60px;
  font-weight: 700;
  color: #000000;
  display: flex;
  flex-direction: column;
  gap: 21px;
  align-items: center;

  &::after {
    content: "";
    width: 96px;
    border-top: 2px solid #7613fd;
    background-color: #000000;
    transition: all 0.2s;
  }

  &:hover::after {
    width: 150px;
  }

  @media ${device.tablet} {
    justify-content: center;
  }
`;

const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const DivInputBox = styled.div`
  position: relative;
  width: 250px;
`;

const InputText = styled.input`
  width: 100%;
  background: transparent;
  color: #808291;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 1em;
  letter-spacing: 0.1em;
  padding: 10px 0 7px;

  &:valid ~ span,
  &:focus ~ span {
    color: #2196f3;
    transform: translateY(-16px);
    font-size: 0.65em;
  }

  &:valid ~ i::before,
  &:focus ~ i::before {
    left: 0;
  }
`;

const SpanText = styled.span`
  position: absolute;
  left: 0;
  padding: 10px 0 5px;
  color: #808291;
  pointer-events: none;
  letter-spacing: 0.1em;
  transition: 0.5s;
`;

const IInput = styled.i`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #808291;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      #ff1b69,
      #ff0,
      #2196f3,
      #7613fd,
      #ff1b69
    );
    animation: animate 2s linear infinite;
  }

  @keyframes animate {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 250px;
    }
  }
`;

const DivButton = styled.div`
  padding-top: 2rem;
`;

const ButtonSubmit = styled.button`
  width: 100%;
  height: 54px;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;

  text-decoration: none;
  border: none;
  cursor: pointer;
  border-radius: 27px;
  background: #7613fd;
  box-shadow: 0px 0px 50px 0px rgb(0 0 0 / 10%);
  transition: all 0.2s;

  &:hover {
    filter: grayscale(0.2);
  }
`;

const GoToContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const GoToDescription = styled.p`
  color: #000000;
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
`;

const GoToText = styled(Link)`
  color: #7613fd;
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
`;

//STYLED COMPONENTS