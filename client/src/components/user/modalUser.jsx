import React, { useEffect } from "react";
import styled from "styled-components";
import { initialForm, validationsForm } from "../../validations/user";
import { UseForm } from "../../hooks/useFormUser";
import { FormContainer, DivInput, DivText, PText, InputText, InputSelect, ErrorCss, PurpleButton, WhiteButton } from "../../styles/formularios";
import ProfilePic from "../globals/profilePic";

const ModalUserContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const Columnas = styled.div`
  display: flex;
  gap: 16px;
`;

const FotoContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ModalUser = ({ actualizar, funcion, user }) => {

  const {
    form,
    errors,
    picPrev,
    handleChange,
    handleSubmit,
    handleFill,
    handleReset,
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
        name: "edad",
        value: form.edad,
        placeholder: "Edad",
        error: errors.edad,
        tipo: "number"
      },
    ];
  }

  let dataSelect;
  if(funcion == "añadir") {
    dataSelect = [
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
  } else if(funcion == "editar") {
    dataSelect = [
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
    ];
  }

  useEffect(() => {
    if(user != undefined) {
      handleFill(user);
    }
  }, [])

  return (
    <ModalUserContainer>
      {
        funcion == "editar" &&
        <FotoContainer>
          <ProfilePic width="75px" height="75px" src={picPrev} />
          <WhiteButton onClick={handleReset}>Reset</WhiteButton>
        </FotoContainer>
      }
      <Columnas>
        <FormContainer>
          {data.map((v, i) => (
            <DivInput key={i}> 
              <DivText>
                <PText>{v.placeholder}</PText>
                {v.error && <ErrorCss>{v.error}</ErrorCss>}
              </DivText>
              <InputText 
                type={v.tipo} 
                name={v.name} 
                value={v.value}
                onChange={ handleChange }
              />
            </DivInput>
          ))}
        </FormContainer>
        <FormContainer>
          {dataSelect.map((v, i) => (
            <DivInput key={i}>
              <DivText>
                <PText>{v.select}</PText>
                {v.error && <ErrorCss>{v.error}</ErrorCss>}
              </DivText>
              <InputSelect
                name={v.select}
                onChange={handleChange}
                defaultValue={v.seleccionado}
              >
                {v.data.map((va, i) => (
                  <option key={i} value={va.value}>
                    {va.nombre}
                  </option>
                ))}
              </InputSelect>
            </DivInput>
          ))}
        </FormContainer>
      </Columnas>
      <PurpleButton onClick={handleSubmit}>{funcion}</PurpleButton>
    </ModalUserContainer>
  ) 
}

export default ModalUser;