import React, { useContext, useState } from "react";
import { useUserContext } from "../context/userContext";
import { initialForm, validationsForm } from "../validations/profile";
import { UseForm } from "../hooks/useForm";
import { getProfile } from "../services/auth";
import { FormContainer, DivInput, PText, InputSelect, PurpleButton, WhiteButton } from "../styles/globals/formularios";
import FormInputsText from "../components/globals/formInputsText";
import { updateUser } from "../services/usuario";
import { db } from "../firebase";
import { UserFirebaseContext } from "../context/userFirebaseContext";
import { doc, updateDoc } from "firebase/firestore";
import { useWindowHeight } from "../hooks/useWindowHeight";
import Photo from "../components/profile/photo";
import { DivButtonsDown, DownContainer, InputsContainer, PDetalles, ProfileContainer, UpContainer } from "../styles/pages/profile";

const Profile = () => {
  const windowHeight = useWindowHeight(true, true);
  const { setCurrentUser } = useContext(UserFirebaseContext);
  const { user, setUser } = useUserContext();
  const [editable, setEditable] = useState(false);

  const actualizar = async () => {
    const newUser = await getProfile();
    const resJson = await newUser?.json();
    setUser({ ...resJson, isLogged: true });
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
    user ? {
      nombre: user.nombre,
      edad: String(user.edad),
      genero: user.genero,
      sede: String(user.id_sede),
      perfil: user.perfil
    } : initialForm,
    validationsForm,
    updateUser,
    () => {
      updateUserFirebase();
      actualizar();
    },
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
        {
          nombre: "No binario",
          value: "no binario",
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

  const updateUserFirebase = async () => {
    //ACTUALIZAR EL CONTEXTO DEL USUARIO
    setCurrentUser(old => ({
      ...old,
      name: form.nombre,
      perfil: form.perfil
    }));
    //ACTUALIZAR EN EL FIREBASE
    await updateDoc(doc(db, "users", String(user?.id)), {
      name: form.nombre,
      perfil: form.perfil
    });
  };

  return (
    <ProfileContainer height={windowHeight}>
      <UpContainer>
        <PDetalles>Detalles Perfil</PDetalles>
        <Photo
          prev={form.perfil}
          editable={editable}
          handleChange={handleChange}
          handleResetImg={handleResetImg}
        />
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
              <PurpleButton onClick={handleSubmit}>
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
            <PurpleButton onClick={() => setEditable(true)}>Editar</PurpleButton>
          )}
        </DivButtonsDown>
      </DownContainer>
    </ProfileContainer>
  );
};

export default Profile;