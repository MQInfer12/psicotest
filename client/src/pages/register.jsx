import React from "react";
import styled from "styled-components";
import { UseForm } from "../hooks/useFormRegister";
import { initialForm, validationsForm } from "../validations/register";
import Alerta from "../components/alerta";
import Cargando from "../components/cargando";
import { ErrorCss } from "../styles/globales";

const Register = () => {
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
    {
      name: "contraseniaRepeat",
      value: form.contraseniaRepeat,
      placeholder: "repetir contrasenia",
      error: errors.contraseniaRepeat,
    },
    {
      name: "edad",
      value: form.edad,
      placeholder: "edad",
      error: errors.edad,
    },
    {
      name: "nombre",
      value: form.nombre,
      placeholder: "nombre",
      error: errors.nombre,
    },
  ];

  let dataSelect = [
    {
      select: "genero",
      data: [
        {
          nombre: "Elija una opcion",
          value: 0,
        },
        {
          nombre: "masculino",
          value: 1,
        },
        {
          nombre: "femenino",
          value: 2,
        },
        {
          nombre: "prefiero no decirlo",
          value: 3,
        },
      ],
      error: errors.genero,
    },
    {
      select: "sede",
      data: [
        {
          nombre: "Elija una opcion",
          value: 0,
        },
        {
          nombre: "Cochabamba",
          value: 1,
        },
        {
          nombre: "La paz",
          value: 2,
        },
        {
          nombre: "El alto",
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

        {dataSelect.map((v, i) => (
          <div>
            <select
              key={i}
              name={v.select}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {v.data.map((va, i) => (
                <option key={i} value={va.value}>
                  {va.nombre}
                </option>
              ))}
            </select>
            {v.error && <ErrorCss>{v.error}</ErrorCss>}
          </div>
        ))}

        <button onClick={handleSubmit}>Regitrarse</button>
      </form>
      {loading && <Cargando />}
      {response && <Alerta />}
    </div>
  );
};

export default Register;
