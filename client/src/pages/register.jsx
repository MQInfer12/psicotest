import React from "react";
import { useParams } from "react-router-dom";
import { UseForm } from "../hooks/useForm";
import { signUp } from "../services/auth";
import { initialForm, validationsForm } from "../validations/register";
import { ErrorCss } from "../styles/globals/formularios";
import ModalRegister from "../components/login/modalRegister";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useModal } from "../hooks/useModal";
import LoginTemplate from "../components/login/loginTemplate";
import { DivInputBox, DivInputs, IInput, InputSelect, InputText, SpanText } from "../styles/pages/login";

const Register = () => {
  const { goTo, userEmail } = useParams();

  const { form, errors, loading, handleChange, handleSubmit, handleReset } = UseForm(
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
      openModal();
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
  
  const { openModal, closeModal } = useModal(
    "",
    <ModalRegister goTo={goTo} form={{email: form.email, contrasenia: form.contrasenia}} cerrar={() => closeModal()}/>
  );

  return (
    <LoginTemplate
      title="Registro"
      goTo={goTo}
      loading={loading}
      submitButton="REGISTRARSE"
      handleSubmit={handleSubmit}
      toLogin
      toRecover
    >
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
    </LoginTemplate>
  );
};

export default Register;