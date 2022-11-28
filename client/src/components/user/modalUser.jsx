import React, { useContext, useEffect } from "react";
import { ProfilePicContext } from "../../context/profilePicContext";
import styled from "styled-components";
import { initialForm, validationsForm } from "../../validations/user";
import { UseForm } from "../../hooks/useForm";
import {
  FormContainer,
  PurpleButton,
  WhiteButton,
} from "../../styles/globals/formularios";
import FormInputsText from "../globals/formInputsText";
import FormInputsSelect from "../globals/formInputsSelect";
import { db } from "../../firebase";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import ProfilePic from "../globals/profilePic";
import { useState } from "react";

const ModalUser = ({ call, actualizar, funcion, user }) => {
  const { profilePics, setProfilePics } = useContext(ProfilePicContext);
  const [loadingEditable, setLoadingEditable] = useState(true);
  const newUser = [];

  const { form, errors, handleChange, handleSubmit, handleResetImg, handleReset } = UseForm(
    user ? {
      nombre: user.nombre_user,
      email: user.email,
      edad: String(user.edad),
      contrasenia: "password",
      genero: user.genero,
      sede: String(user.id_sede),
      rol: String(user.id_rol),
      perfil: profilePics[user.id],
    } : initialForm,
    validationsForm,
    call,
    (respuesta) => {
      if(funcion == "añadir") {
        createFirebaseUser(respuesta.user);
      } else if(funcion == "editar") {
        updateFirebaseUser(respuesta.user);
        setProfilePics(old => ({
          ...old,
          [user.id]: form.perfil 
        }));
      }
      actualizar();
    },
    user?.id
  );

  let dataText;
  if (funcion == "añadir") {
    dataText = [
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
        tipo: "text",
      },
      {
        name: "edad",
        value: form.edad,
        placeholder: "Edad",
        error: errors.edad,
        tipo: "number",
      },
    ];
  } else if (funcion == "editar") {
    dataText = [
      {
        name: "nombre",
        value: form.nombre,
        placeholder: "Nombre",
        error: errors.nombre,
        tipo: "text",
      },
      {
        name: "edad",
        value: form.edad,
        placeholder: "Edad",
        error: errors.edad,
        tipo: "number",
      },
    ];
  }

  let dataSelect;
  if (funcion == "añadir") {
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
  } else if (funcion == "editar") {
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

  const createFirebaseUser = async (nuevoUsuario) => {
    const { email, nombre, id, id_rol } = nuevoUsuario;

    await setDoc(doc(db, "users", String(id)), {
      uid: id,
      name: nombre,
      email: email,
      rol: id_rol,
      perfil: null,
    });
    await setDoc(doc(db, "userChats", String(id)), {});
  }

  const updateFirebaseUser = async (nuevoUsuario) => {
    const { nombre, perfil, id } = nuevoUsuario;
    const q = query(collection(db, "users"), where("uid", "==", id));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newUser.push(doc.data());
      });
      const newUserObj = Object.assign({}, newUser[0]);
      await updateDoc(doc(db, "users", String(newUserObj.uid)), {
        name: nombre,
        perfil: perfil 
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(user?.perfil) {
      if(profilePics[user?.id]) {
        handleReset();
        setLoadingEditable(false);
      }
    } else {
      setLoadingEditable(false);
    }
  }, [profilePics[user?.id]]);

  const [prev, setPrev] = useState(form.perfil ? "pendiente..." : null);

  useEffect(() => {
    if(form.perfil?.type === "image/jpeg" || form.perfil?.type === "image/png") {
      const imgURL = URL.createObjectURL(form.perfil);
      setPrev(imgURL);
    } else if (form.perfil === null) {
      setPrev("");
    } else {
      setPrev("pendiente...");
    }
  }, [form.perfil]);

  return (
    <ModalUserContainer>
      {funcion == "editar" && (
        <FotoContainer>
          <ProfilePic
            width="75px" 
            height="75px" 
            id={user.id}
            perfil={user.perfil}
            editable={true}
            prev={prev} 
          />
          <WhiteButton onClick={() => handleResetImg("perfil")}>
            Reset
          </WhiteButton>
        </FotoContainer>
      )}
      <Columnas>
        <FormContainer>
          <FormInputsText data={dataText} handleChange={handleChange} />
        </FormContainer>
        <FormContainer>
          <FormInputsSelect data={dataSelect} handleChange={handleChange} />
        </FormContainer>
      </Columnas>
      <PurpleButton onClick={handleSubmit} disabled={loadingEditable}>{funcion}</PurpleButton>
    </ModalUserContainer>
  );
};

export default ModalUser;

const ModalUserContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const Columnas = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const FotoContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;