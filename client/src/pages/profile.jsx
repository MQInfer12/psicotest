import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import styled from "styled-components";
import ProfilePic from "../components/globals/profilePic";
import { initialForm, validationsForm } from "../validations/profile";
import { UseForm } from "../hooks/useFormProfile";
import { ErrorCss } from "../styles/formularios";
import { getProfile } from "../services/auth";

const ProfileContainer = styled.div`
  height: calc(100vh - 197px);
  background-color: #FFFFFF;
  border-radius: 10px;
`;

const UpContainer = styled.div`
  height: 200px;
  border-bottom: 0.5px solid #ADA7A7;
  padding: 31px 0px 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PDetalles = styled.div`
  font-weight: 400;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
`;

const DivPhoto = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const ImgPhoto = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 10px;
`;

const DivPhotoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DivPhotoButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const DivFile = styled.div`
  position: relative;
`;

const InputFile = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

const SubirButton = styled.button`
  border: none;
  padding: 8px 26px 8px 26px;
  background-color: #660BE1;
  border-radius: 8px;
  color: #D9D9D9;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
`;

const ResetButton = styled.button`
  border: 1px solid #D9D9D9;
  padding: 8px 20px 8px 20px;
  background-color: #FFFFFF;
  border-radius: 8px;
  color: #ADA7A7;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
`;

const InfoPhotoExtensions = styled.p`
  font-size: 15px;
  color: #ADA7A7;
`;

const DownContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 26px 40px 26px;
  gap: 24px;
`;

const InputsContainer = styled.div`
  display: flex;
  gap: 44px;
  justify-content: space-around;
`;

const InputsColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputInfo = styled.p`
  text-transform: uppercase;
  font-size: 12px;
  color: #ADA7A7;
  font-weight: 500;
`;

const InputText = styled.input`
  border-radius: 5px;
  border: 1px solid #D9D9D9;
  outline: none;
  color: #636161;
  min-width: 500px;
  height: 38px;
  padding-left: 10px;
`;

const InputSelect = styled.select`
  border-radius: 5px;
  border: 1px solid #D9D9D9;
  outline: none;
  color: #636161;
  min-width: 500px;
  height: 38px;
  padding-left: 10px;
`;

const DivButtonsDown = styled.div`
  display: flex;
  gap: 12px;
`;

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const actualizar = async () => {
    const newUser = await getProfile();
    setUser(newUser);
  }

  const {
    form,
    errors,
    picPrev,
    handleChange,
    handleSubmit,
    handleFill,
    handleReset
  } = UseForm(initialForm, validationsForm, actualizar, user?.id);

  useEffect(() => {
    handleFill(user);
  }, []);

  let dataleft = [
    {
      name: "nombre",
      value: form.nombre,
      placeholder: "Nombre",
      error: errors.nombre,
      tipo: "text",
      disabled: false
    },
    {
      name: "email",
      value: user?.email,
      placeholder: "Email",
      error: errors.email,
      tipo: "text",
      disabled: true
    },
    {
      name: "contrasenia",
      value: "password",
      placeholder: "Contraseña",
      error: errors.contrasenia,
      tipo: "password",
      disabled: true
    },
    {
      name: "edad",
      value: form.edad,
      placeholder: "Edad",
      error: errors.edad,
      tipo: "number",
      disabled: false
    },
  ]

  let dataSelect = [
    {
      select: "genero",
      selected: user?.genero,
      data: [
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
      selected: user?.id_sede,
      data: [
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

  return (
    <ProfileContainer>
      <UpContainer>
        <PDetalles>Detalles Perfil</PDetalles>
        <DivPhoto>
          <ProfilePic 
            width="100px" 
            height="100px"
            src={picPrev}
          />
          <DivPhotoInfo>
            <DivPhotoButtons>
              <DivFile>
                <InputFile 
                  type="file" 
                  name="perfil"
                  value={form.perfil}
                  onChange={ handleChange }
                />
                <SubirButton>Subir foto nueva</SubirButton>
              </DivFile>
              <ResetButton onClick={ handleReset }>Reset</ResetButton>
            </DivPhotoButtons>
            <InfoPhotoExtensions>Permitido JPG, JPEG o PNG. Tamaño máximo de 800Kb.</InfoPhotoExtensions>
          </DivPhotoInfo>
        </DivPhoto>
      </UpContainer>
      <DownContainer>
        <InputsContainer>
          <InputsColumn>
            {
              dataleft.map((v, i) => (
                <DivInputs key={i}>
                  <InputInfo>{v.placeholder}</InputInfo>
                  <InputText 
                    value={v.value}
                    name={v.name}
                    type={v.tipo}
                    disabled={v.disabled}
                    onChange={ handleChange }
                  />
                  {v.error && <ErrorCss>{v.error}</ErrorCss>}
                </DivInputs>
              ))
            }
          </InputsColumn>
          <InputsColumn>
            {
              dataSelect.map((v, i) => (
                <DivInputs key={i}>
                  <InputInfo>{v.select}</InputInfo>
                  <InputSelect
                    onChange={ handleChange }
                    name={v.select}
                    defaultValue={v.selected}
                  >
                    {
                      v.data.map((va, i) => (
                        <option key={i} value={va.value}>
                          {va.nombre}
                        </option>
                      ))
                    }
                  </InputSelect>
                </DivInputs>
              ))
            }
          </InputsColumn>
        </InputsContainer>
        <DivButtonsDown>
          <SubirButton onClick={ handleSubmit }>Guardar cambios</SubirButton>
          <ResetButton>Cancelar</ResetButton>
        </DivButtonsDown>
      </DownContainer>
    </ProfileContainer>
  )
}

export default Profile;