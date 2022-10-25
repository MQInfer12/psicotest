import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UseForm } from "../hooks/useForm";
import { signUp } from "../services/auth";
import { initialForm, validationsForm } from "../validations/register";
import { ErrorCss } from "../styles/formularios";
import Modal from "../components/globals/modal";
import ModalRegister from "../components/register/modalRegister";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import ImagenLogin from "../images/imglogin.jpg";
import Navbar from "../components/landing/navbar";

const Register = () => {
  const userEmail = useParams();
  const [showModal, setShowModal] = useState(false);

  const { form, errors, handleChange, handleSubmit, handleReset } = UseForm(
    Object.keys(userEmail).length ? {
      email: userEmail.userEmail,
      contrasenia: "",
      contraseniaRepeat: "",
      edad: "",
      nombre: "",
      genero: "",
      sede: "",
    } : initialForm,
    validationsForm,
    signUp,
    (respuesta) => {
      createFirebaseUser(respuesta.user);
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
  }

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
                  <GoToText to="/login">Inicia sesión</GoToText>
                </GoToContainer>
      
                <DivButton>
                  <ButtonSubmit onClick={handleSubmit}>
                    REGISTRARSE
                  </ButtonSubmit>
                </DivButton>
              </Form>
            </DivFormlog>
          </DivPrincipal>
        </section>
        {showModal && (
          <Modal cerrar={() => setShowModal(false)}>
            <ModalRegister />
          </Modal>
        )}
      </main>
    </>
  );
};

export default Register;


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
  overflow: auto;
`;

const Form = styled.form`
  margin: auto;
  width: 346px;
  height: max-content;
`;

const H1Title = styled.h1`
  padding-top: 2rem;
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
    width: 250px;
  }
`;

const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const DivInputBox = styled.div`
  position: relative;
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
      background-position-x: 346px;
    }
  }
`;

const DivButton = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
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

const InputSelect = styled.select`
  padding-left: 18px;
  font-size: 16px;
  color: #ffffff;
  font-weight: 400;
  height: 45px;
  background-color: #7613fd;
  border-radius: 10px;
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