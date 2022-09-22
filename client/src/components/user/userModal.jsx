import React, { useState } from "react";
import styled from "styled-components";
import { initialForm, validationsForm } from "../../validations/user";
import { UseForm } from "../../hooks/useFormUser";
import { ErrorCss } from "../../styles/globales";

const DivModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
`;

const ButtonClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 32px;
  width: 32px;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 16px;
  background: linear-gradient(to right, #ff512f, #dd2476);
  box-shadow: 0px 0px 50px 0px rgb(0 0 0 / 10%);
  color: #f8f9fa;

  &:hover {
    background: linear-gradient(to right, #8e2de2, #4a00e0);
  }
`;

const DivAtras = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const FormAlerta = styled.form`
  position: relative;
  z-index: 1;
  border-radius: 16px;
  width: 400px;
  min-height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  padding: 40px;
  text-align: center;
`;

const DivInput = styled.div`
  width: 100%;
  text-align: left;
`;

const PText = styled.p`
  font-size: 1rem;
  color: #808291;
`;

const InputText = styled.input`
  border: none;
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid black;
`;

const ButtonModal = styled.button`
  text-decoration: none;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.4rem 1rem;
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

const UserModal = ({ cerrar, actualizar, funcion, user }) => {

  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleUser,
  } = UseForm(initialForm, validationsForm, (() => { actualizar(); cerrar(); }), funcion, user?.id);

  let data;
  if(funcion == "añadir") {
    data = [
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
        tipo: "text"
      },
      {
        name: "edad",
        value: form.edad,
        placeholder: "Edad",
        error: errors.edad,
        tipo: "number"
      },
    ];
  } else if(funcion == "editar") {
    data = [
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
        name: "edad",
        value: form.edad,
        placeholder: "Edad",
        error: errors.edad,
        tipo: "number"
      },
    ];
  }

  let dataSelect = [
    {
      select: "genero",
      seleccionado: user?.genero,
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
      seleccionado: user?.id_sede,
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
    {
      select: "rol",
      seleccionado: user?.id_rol,
      data: [
        {
          nombre: "Elija una opción",
          value: 0,
        },
        {
          nombre: "Beneficiario",
          value: 1,
        },
        {
          nombre: "Docente",
          value: 2,
        },
        {
          nombre: "Administrador",
          value: 3,
        },
      ],
      error: errors.rol,
    },
  ];

  useState(() => {
    if(user != undefined) {
      handleUser(user);
    }
  }, [])

  return (
    <DivModalContainer>
      <DivAtras onClick={cerrar}></DivAtras>
      <FormAlerta>
          {data.map((v, i) => (
            <DivInput key={i}> 
              <PText>{v.placeholder}</PText>
              <InputText 
                type={v.tipo} 
                name={v.name} 
                value={v.value}
                onChange={ handleChange }
              />
              {v.error && <ErrorCss>{v.error}</ErrorCss>}
            </DivInput>
          ))}
          {dataSelect.map((v, i) => (
            <DivInput key={i}>
              <select
                name={v.select}
                onChange={handleChange}
                defaultValue={v.seleccionado}
              >
                {v.data.map((va, i) => (
                  <option key={i} value={va.value}>
                    {va.nombre}
                  </option>
                ))}
              </select>
              {v.error && <ErrorCss>{v.error}</ErrorCss>}
            </DivInput>
          ))}
        <ButtonModal onClick={handleSubmit}>{funcion}</ButtonModal>
        <ButtonClose onClick={cerrar}>x</ButtonClose>
      </FormAlerta>
    </DivModalContainer>
  )
}

export default UserModal;