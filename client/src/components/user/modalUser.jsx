import React, { useEffect } from "react";
import styled from "styled-components";
import { initialForm, validationsForm } from "../../validations/user";
import { UseForm } from "../../hooks/useFormUser";
import { DivInput, PText, InputText, ErrorCss, ButtonModal } from "../../styles/formularios";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const ModalUser = ({ actualizar, funcion, user }) => {

  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleUser,
  } = UseForm(initialForm, validationsForm, actualizar, funcion, user?.id);

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
      ],
      error: errors.rol,
    },
  ];

  useEffect(() => {
    if(user != undefined) {
      handleUser(user);
    }
  }, [])

  return (
    <FormContainer>
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
    </FormContainer>
  ) 
}

export default ModalUser;