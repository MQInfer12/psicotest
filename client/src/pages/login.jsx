import React from "react";
import { initialForm, validationsForm } from "../validations/login";
import styled from "styled-components";
import { UseForm } from "../hooks/useFormLogin";
import Alerta from "../components/alerta";
import Cargando from "../components/cargando";
import { ErrorCss } from "../styles/globales";

const Login = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = UseForm(initialForm, validationsForm);

  let data = [
    {
      name: "email",
      value: form.email,
      placeholder: "correo",
      error: errors.email,
    },
    {
      name: "contrasenia",
      value: form.contrasenia,
      placeholder: "contrasenia",
      error: errors.contrasenia,
    },
  ];

  return (
    <div>
      <form action="">
        {data.map((v, i) => (
          <div key={i}>
            <input
              type="text"
              name={v.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={v.value}
              placeholder={v.placeholder}
            />
            {v.error && <ErrorCss>{v.error}</ErrorCss>}
          </div>
        ))}

        <button onClick={handleSubmit}>Iniciar</button>
      </form>
      {loading && <Cargando />}
      {response && <Alerta />}
    </div>
  );
};

export default Login;
