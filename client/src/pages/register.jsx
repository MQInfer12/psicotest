import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { device } from "../styles/globals/devices";
import { Link } from "react-router-dom";
import { UseForm } from "../hooks/useForm";
import { signUp } from "../services/auth";
import { initialForm, validationsForm } from "../validations/register";
import { ErrorCss } from "../styles/globals/formularios";
import Modal from "../components/globals/modal";
import ModalRegister from "../components/register/modalRegister";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import ImagenLogin from "../assets/login/imglogin.jpg";
import Navbar from "../components/landing/navbar";
import { useWindowHeight } from "../hooks/useWindowHeight";

const Register = () => {
  const windowHeight = useWindowHeight();
  const { goTo, userEmail } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState({});

  const { form, errors, handleChange, handleSubmit, handleReset } = UseForm(
    userEmail ? {
      email: userEmail,
      contrasenia: "",
      contraseniaRepeat: "",
      edad: "",
      nombre: "",
      genero: "",
      sede: "",
    } : initialForm,
    validationsForm,
    signUp,
    async (respuesta) => {
      createFirebaseUser(respuesta.user);
      setLogin({email: form.email, contrasenia: form.contrasenia});
      setShowModal(true);
      handleReset();
    }
  );

  let data = [
    {
      name: "nombre",
      value: form.nombre,
      placeholder: "Nombre",
      error: errors.nombre,
      tipo: "text",
    },
    {
      name: "email",
      value: form.email,
      placeholder: "Correo",
      error: errors.email,
      tipo: "text",
    },
    {
      name: "contrasenia",
      value: form.contrasenia,
      placeholder: "Contraseña",
      error: errors.contrasenia,
      tipo: "password",
    },
    {
      name: "contraseniaRepeat",
      value: form.contraseniaRepeat,
      placeholder: "Repetir contraseña",
      error: errors.contraseniaRepeat,
      tipo: "password",
    },
    {
      name: "edad",
      value: form.edad,
      placeholder: "Edad",
      error: errors.edad,
      tipo: "number",
    },
  ];

  let dataSelect = [
    {
      select: "genero",
      data: [
        {
          nombre: "Elija un género",
          value: 0,
        },
        {
          nombre: "Hombre",
          value: "hombre",
        },
        {
          nombre: "Mujer",
          value: "mujer",
        },
        {
          nombre: "No binario",
          value: "no binario",
        },
      ],
      error: errors.genero,
    },
    {
      select: "sede",
      data: [
        {
          nombre: "Elija una sede",
          value: 0,
        },
        {
          nombre: "Cochabamba",
          value: 1,
        },
        {
          nombre: "La Paz",
          value: 2,
        },
        {
          nombre: "El Alto",
          value: 3,
        },
        {
          nombre: "Santa Cruz",
          value: 4,
        },
      ],
      error: errors.sede,
    },
  ];

  const createFirebaseUser = async (nuevoUsuario) => {
    const { email, nombre, id } = nuevoUsuario;

    await setDoc(doc(db, "users", String(id)), {
      uid: id,
      name: nombre,
      email: email,
      rol: "1",
      perfil: null,
    });
    await setDoc(doc(db, "userChats", String(id)), {});
    await setDoc(doc(db, "notifications", String(id)), {
      notification: [],
    });
  }

  useEffect(() => {
    if(userEmail) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <Navbar />
      <DivPrincipal height={windowHeight}>
        <DivImagelog>
          <DivItemlog></DivItemlog>
        </DivImagelog>
  
        <DivFormlog>
          <Form>
            <H1Title>Registro</H1Title>
  
            {data.map((v, i) => (
              <DivInputs key={i}>
                <DivInputBox>
                  <InputText
                    required
                    type={v.tipo}
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
  
            {dataSelect.map((v, i) => (
              <DivInputs key={i}>
                <InputSelect name={v.select} onChange={handleChange}>
                  {v.data.map((va, i) => (
                    <option key={i} value={va.value}>
                      {va.nombre}
                    </option>
                  ))}
                </InputSelect>
                {v.error && <ErrorCss>{v.error}</ErrorCss>}
              </DivInputs>
            ))}
            <GoToContainer>
              <GoToDescription>¿Ya tienes una cuenta?</GoToDescription>
              <GoToText to={goTo ? "/login/" + goTo : "/login"}>Inicia sesión</GoToText>
            </GoToContainer>
  
            <DivButton>
              <ButtonSubmit onClick={handleSubmit}>
                REGISTRARSE
              </ButtonSubmit>
            </DivButton>
          </Form>
        </DivFormlog>
      </DivPrincipal>
      {showModal && (
        <Modal cerrar={() => setShowModal(false)}>
          <ModalRegister goTo={goTo} form={login}/>
        </Modal>
      )}
    </>
  );
};

export default Register;


//STYLED COMPONENTS

const DivPrincipal = styled.div`
  display: flex;
  text-align: center;
  height: ${props => props.height};
  overflow: hidden;
  position: relative;

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const DivImagelog = styled.div`
  width: 145%;
  height: 100%;
  @media ${device.tablet} {
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
  width: 100%;
  margin-top: 90px;
  height: calc(100% - 90px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  overflow-x: hidden;
  padding-bottom: 2rem;

  @media ${device.tablet} {
    width: max-content;
    max-height: 70vh;
    margin-top: 45px;
    padding: 40px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255, 0.7);
    backdrop-filter: blur(5px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
`;

const Form = styled.form`
  margin: auto 0;
  width: 250px;
  display: flex;
  flex-direction: column;
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
    width: 250px;
  }

  @media ${device.tablet} {
    height: max-content;
    padding-bottom: 25px;
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
  width: 250px;
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

const InputSelect = styled.select`
  width: 250px;
  padding-left: 18px;
  font-size: 16px;
  color: #ffffff;
  font-weight: 400;
  height: 45px;
  background-color: #7613fd;
  border-radius: 10px;
  border: none;
  outline: none;
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