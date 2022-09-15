import React from "react";
import styled from "styled-components";
import { UseForm } from "../hooks/useFormRegister";
import { initialForm, validationsForm } from "../validations/register";
import Alerta from "../components/alerta";
import Cargando from "../components/cargando";
import { ErrorCss } from "../styles/globales";

//STYLED COMPONENTS

const DivPrincipal = styled.div`
  display: grid;
  grid-column-gap: 5em;
  column-gap: 5em;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  text-align: center;
  height: 100vh;
  overflow: hidden;
`;

const DivImagelog = styled.div`
  display: grid;
  grid-template-columns: repeat(16, minmax(10px, 1fr));
  grid-template-rows: repeat(10, minmax(95px, 1fr));
`;

const DivItemlog = styled.div`
  grid-column-start: 1;
  grid-column-end: 17;
  grid-row-start: 1;
  grid-row-end: 11;
  background: url('/src/images/imglogin.jpg') no-repeat;
  background-size: cover;
`;

const DivFormlog = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const H1Title = styled.h1`
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: 2.2em;
  line-height: 3rem;
  color: #1a3260;
`;

const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const DivInputBox = styled.div`
  position: relative;
  width: 250px;
  margin-right: 20px;
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
  text-transform: uppercase;
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
    content: '';
    position: absolute;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #ff1b69, #ff0, #2196f3, #9c27b0, #ff1b69);
    animation: animate 2s linear infinite;
  }

  @keyframes animate{
    0%{
        background-position-x: 0;
    }
    100%{
        background-position-x: 250px;
    }
  }
`;

const DivButton = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const ButtonSubmit = styled.button`
  text-decoration: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1rem;
  background: linear-gradient(to right, #ff512f, #dd2476);
  box-shadow: 0px 0px 50px 0px rgb(0 0 0 / 10%);
  color: #f8f9fa;

  &:hover {
    background: linear-gradient(to right, #8e2de2, #4a00e0);
  }
`;

//STYLED COMPONENTS

const Register = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleSubmit,
  } = UseForm(initialForm, validationsForm);

  let data = [
    {
      name: "nombre",
      value: form.nombre,
      placeholder: "Nombre",
      error: errors.nombre,
      tipo: "text"
    },
    {
      name: "email",
      value: form.email,
      placeholder: "Correo",
      error: errors.email,
      tipo: "text"
    },
    {
      name: "contrasenia",
      value: form.contrasenia,
      placeholder: "Contraseña",
      error: errors.contrasenia,
      tipo: "password"
    },
    {
      name: "contraseniaRepeat",
      value: form.contraseniaRepeat,
      placeholder: "Repetir contraseña",
      error: errors.contraseniaRepeat,
      tipo: "password"
    },
    {
      name: "edad",
      value: form.edad,
      placeholder: "Edad",
      error: errors.edad,
      tipo: "number"
    },
  ];

  let dataSelect = [
    {
      select: "genero",
      data: [
        {
          nombre: "Elija una opción",
          value: 0,
        },
        {
          nombre: "Hombre",
          value: "hombre",
        },
        {
          nombre: "Mujer",
          value: "mujer",
        }
      ],
      error: errors.genero,
    },
    {
      select: "sede",
      data: [
        {
          nombre: "Elija una opción",
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
        ,
        {
          nombre: "Santa Cruz",
          value: 4,
        },
      ],
      error: errors.sede,
    },
  ];

  return (
    <main>
      <section>
        <DivPrincipal>
          <DivImagelog>
            <DivItemlog></DivItemlog>
          </DivImagelog>

          <DivFormlog>
            <form>
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
                  <select
                    name={v.select}
                    onChange={handleChange}
                  >
                    {v.data.map((va, i) => (
                      <option key={i} value={va.value}>
                        {va.nombre}
                      </option>
                    ))}
                  </select>
                  {v.error && <ErrorCss>{v.error}</ErrorCss>}
                </DivInputs>
              ))}

              <DivButton>
                <ButtonSubmit onClick={handleSubmit}>REGISTRARSE</ButtonSubmit>
              </DivButton>
            </form>
          </DivFormlog>
        </DivPrincipal>
      </section>
    </main>
  );
};

export default Register;
