import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import styled from "styled-components";
import ProfilePic from "../components/globals/profilePic";
import { initialForm, validationsForm } from "../validations/profile";
import { UseForm } from "../hooks/useForm";
import { getProfile } from "../services/auth";
import {
  FormContainer,
  DivInput,
  PText,
  InputSelect,
  PurpleButton,
  WhiteButton,
} from "../styles/formularios";
import FormInputsText from "../components/globals/formInputsText";
import { updateUser } from "../services/usuario";

import { db } from "../firebase";
import { UserFirebaseContext } from "../context/userFirebaseContext";
import { doc, updateDoc } from "firebase/firestore";

const ProfileContainer = styled.div`
  min-height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  position: relative;
`;

const UpContainer = styled.div`
  height: 200px;
  border-bottom: 0.5px solid #ada7a7;
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

const InfoPhotoExtensions = styled.p`
  font-size: 15px;
  color: #ada7a7;
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

const DivButtonsDown = styled.div`
  display: flex;
  gap: 12px;
`;

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [editable, setEditable] = useState(false);

  const actualizar = async () => {
    const newUser = await getProfile();
    setUser(newUser);
    setEditable(false);
  };

  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
    handleResetImg,
  } = UseForm(
    user
      ? {
          nombre: user.nombre,
          edad: String(user.edad),
          genero: user.genero,
          sede: String(user.id_sede),
          perfil: user.perfil,
        }
      : initialForm,
    validationsForm,
    updateUser,
    actualizar,
    user?.id
  );

  let dataleft = [
    {
      name: "nombre",
      value: form.nombre,
      placeholder: "Nombre",
      error: errors.nombre,
      tipo: "text",
      disabled: false || !editable,
    },
    {
      name: "email",
      value: user?.email,
      placeholder: "Email",
      error: errors.email,
      tipo: "text",
      disabled: true || !editable,
    },
    {
      name: "contrasenia",
      value: "password",
      placeholder: "Contraseña",
      error: errors.contrasenia,
      tipo: "password",
      disabled: true || !editable,
    },
    {
      name: "edad",
      value: form.edad,
      placeholder: "Edad",
      error: errors.edad,
      tipo: "number",
      disabled: false || !editable,
    },
  ];

  let dataSelect = [
    {
      select: "genero",
      seleccionado: user?.genero,
      data: [
        {
          nombre: "Hombre",
          value: "hombre",
        },
        {
          nombre: "Mujer",
          value: "mujer",
        },
      ],
      error: errors.genero,
      disabled: !editable,
    },
    {
      select: "sede",
      seleccionado: user?.id_sede,
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
      disabled: !editable,
    },
  ];

  const { currentUser } = useContext(UserFirebaseContext);

  const updateUserFirebase = async (stringImg) => {
    const ref = doc(db, "users", currentUser.uid);
    await updateDoc(ref, {
      img: stringImg,
    });
  };
  const sendData = (e) => {
    updateUserFirebase(form.perfil);
    handleSubmit(e);
  };

  return (
    <ProfileContainer>
      <UpContainer>
        <PDetalles>Detalles Perfil</PDetalles>
        <DivPhoto>
          <ProfilePic
            width="100px"
            height="100px"
            src={editable ? form.perfil : user?.perfil}
          />
          {editable && (
            <DivPhotoInfo>
              <DivPhotoButtons>
                <DivFile>
                  <InputFile
                    type="file"
                    name="perfil"
                    onChange={handleChange}
                    accept='.jpg,.png,.jpeg'
                  />
                  <PurpleButton>Subir foto nueva</PurpleButton>
                </DivFile>
                <WhiteButton onClick={() => handleResetImg("perfil")}>
                  Reset
                </WhiteButton>
              </DivPhotoButtons>
              <InfoPhotoExtensions>
                Permitido JPG, JPEG o PNG. {/*Tamaño máximo de 800Kb.*/}
              </InfoPhotoExtensions>
            </DivPhotoInfo>
          )}
        </DivPhoto>
      </UpContainer>
      <DownContainer>
        <InputsContainer>
          <FormContainer>
            <FormInputsText data={dataleft} handleChange={handleChange} />
          </FormContainer>
          <FormContainer>
            {dataSelect.map((v, i) => (
              <DivInput key={i}>
                <PText>{v.select}</PText>
                {editable ? (
                  <InputSelect
                    onChange={handleChange}
                    name={v.select}
                    defaultValue={v.seleccionado}
                    disabled={!editable}
                  >
                    {v.data.map((va, i) => (
                      <option key={i} value={va.value}>
                        {va.nombre}
                      </option>
                    ))}
                  </InputSelect>
                ) : (
                  <InputSelect
                    onChange={handleChange}
                    name={v.select}
                    value={v.seleccionado}
                    disabled={!editable}
                  >
                    {v.data.map((va, i) => (
                      <option key={i} value={va.value}>
                        {va.nombre}
                      </option>
                    ))}
                  </InputSelect>
                )}
              </DivInput>
            ))}
          </FormContainer>
        </InputsContainer>
        <DivButtonsDown>
          {editable ? (
            <>
              <PurpleButton onClick={(e) => sendData(e)}>
                Guardar cambios
              </PurpleButton>
              <WhiteButton
                onClick={() => {
                  setEditable(false);
                  handleReset();
                }}
              >
                Cancelar
              </WhiteButton>
            </>
          ) : (
            <PurpleButton onClick={() => setEditable(true)}>
              Editar
            </PurpleButton>
          )}
        </DivButtonsDown>
      </DownContainer>
    </ProfileContainer>
  );
};

export default Profile;
