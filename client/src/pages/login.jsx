import React from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { initialForm, validationsForm } from "../validations/login";
import { UseForm } from "../hooks/useForm";
import { getProfile, signIn } from "../services/auth";
import { ErrorCss } from "../styles/globals/formularios";
import LoginTemplate from "../components/login/loginTemplate";
import { DivInputBox, DivInputs, IInput, InputText, SpanText } from "../styles/pages/login";
import { useVTNavigate } from "../hooks/useVTNavigate";

const Login = () => {
  const { goTo } = useParams();
  const { setUser } = useUserContext();
  const navigate = useVTNavigate();

  const obtenerPerfil = async () => {
    const profile = await getProfile();
    const resJson = await profile?.json();
    setUser({ ...resJson, isLogged: true });
    navigate(goTo ? goTo.replaceAll("_47slash_", "/") : "/dashboard/tests");
  }

  const { form, errors, loading, handleChange, handleSubmit } = UseForm(
    initialForm,
    validationsForm,
    signIn,
    obtenerPerfil
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
    <LoginTemplate
      title="Login"
      goTo={goTo}
      loading={loading}
      submitButton="INICIA SESIÓN"
      handleSubmit={handleSubmit}
      otherMethods
      obtenerPerfil={obtenerPerfil}
      toRegister
      toRecover
    >
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
    </LoginTemplate>
  );
};

export default Login;