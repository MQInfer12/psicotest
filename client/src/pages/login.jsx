import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";
import { initialForm, validationsForm } from "../validations/login";
import styled from "styled-components";
import { UseForm } from "../hooks/useForm";
import { getProfile, signIn } from "../services/auth";
import { ErrorCss } from "../styles/formularios";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ImagenLogin from "../images/imglogin.jpg";
import Navbar from "../components/landing/navbar";

//STYLED COMPONENTS

const DivPrincipal = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  text-align: center;
  height: 100vh;
  overflow: hidden;
`;

const DivImagelog = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(16, minmax(10px, 1fr));
  grid-template-rows: repeat(10, minmax(95px, 1fr));
`;

const DivItemlog = styled.div`
  height: 100vh;
  grid-column-start: 1;
  grid-column-end: 17;
  grid-row-start: 1;
  grid-row-end: 11;
  background: url(${ImagenLogin}) no-repeat;
  background-size: cover;
  background-position-y: center;
`;

const DivFormlog = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const H1Title = styled.h1`
  padding-bottom: 3rem;
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
    width: 165px;
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

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { form, errors, handleChange, handleSubmit } = UseForm(
    initialForm,
    validationsForm,
    signIn,
    async () => {
      const profile = await getProfile();
      setUser(profile);
      navigate("/dashboard/tests");
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

  return (
    <>
      <Navbar />
      <main>
        <section>
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
                  <GoToText to="/register">Regístrate</GoToText>
                </GoToContainer>
                <DivButton>
                  <ButtonSubmit onClick={handleSubmit}>
                    LOGIN
                  </ButtonSubmit>
                </DivButton>
              </form>
            </DivFormlog>
          </DivPrincipal>
        </section>
      </main>
    </>
  );
};

export default Login;
