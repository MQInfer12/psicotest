import React from "react";
import { DangerIconButton, WhiteIconButton } from "../../styles/globals/formularios";
import { ableUser, updateUser, deleteUser as serviceDeleteUser } from "../../services/usuario";
import ModalUser from "./modalUser";
import ProfilePic from "../globals/profilePic";
import SureModal from "../globals/sureModal";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useModal } from "../../hooks/useModal";
import { DivCard, DivCardButtons, DivCardText, DivColumns, DivEstado, DivRow, PGenero, PNombre, PRol, PText } from "../../styles/pages/user";

const UserCard = (props) => {
  const newUser = [];

  const cambiarHabilitado = async () => {
    const res = await ableUser(props.id);
    const resJson = await res?.json();
    if ((resJson.mensaje = "se actualizo correctamente")) {
      props.onSubmit();
    }
  };

  const borrarUsuario = async () => {
    const res = await serviceDeleteUser(props.id);
    const resJson = await res?.json();
    if (resJson) {
      deleteFirebaseUser(props.id);
      props.onSubmit();
    }
  }

  const deleteFirebaseUser = async (id) => {
    const q = query(collection(db, "users"), where("uid", "==", id));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newUser.push(doc.data());
      });
      const newUserObj = Object.assign({}, newUser[0]);

      await deleteDoc(doc(db, "users", String(newUserObj.uid)));
      await deleteDoc(doc(db, "userChats", String(newUserObj.uid)));

      //TODO: FALTA BORRAR LOS CHATS QUE INCLUYEN A ESTE USUARIO

    } catch (err) {
      console.log(err);
    }
  }
  
  const { openModal: openEditar, closeModal: closeEditar } = useModal(
    "Editar usuario",
    <ModalUser
      call={updateUser}
      actualizar={() => {
        props.onSubmit();
        closeEditar();
      }}
      funcion="editar"
      user={props}
    />
  )
  const { openModal: openBorrar, closeModal: closeBorrar } = useModal(
    "Borrar usuario",
    <SureModal
      cerrar={() => closeBorrar()}
      sure={borrarUsuario}
      text="Se eliminarán el usuario y sus datos permanentemente"
    />
  )

  return (
    <DivCard estado={props.estado}>
      <ProfilePic width="100px" height="100px" perfil={props.perfil} />
      <DivEstado estado={props.estado}><i className="fa-solid fa-circle"></i>{props.estado ? "Habilitado" : "Deshabilitado"}</DivEstado>
      <DivCardText>
        <PNombre>{props.nombre_user}</PNombre>
        <PRol>{props.nombre_rol}</PRol>
        <DivRow>
          <DivColumns>
            <PText>{props.email}</PText>
            <PGenero>
              {
                props.genero == "hombre"? (
                  <i className="fa-solid fa-mars"></i>
                ) : props.genero == "mujer"? (
                  <i className="fa-solid fa-venus"></i>
                ) : (
                  <i className="fa-solid fa-genderless"></i>
                )
              }
              {props.genero}
            </PGenero>
          </DivColumns>
          <DivColumns>
            <PText>{props.nombre_sede}</PText>
            <PText>{props.edad} años</PText>
          </DivColumns>
        </DivRow>
      </DivCardText>
      <DivCardButtons>
        <WhiteIconButton
          title="Editar usuario"
          disabled={props.id_rol == 3}
          onClick={openEditar}
        >
          <i className="fa-solid fa-pencil"></i>
        </WhiteIconButton>
        <WhiteIconButton
          title={props.estado ? "Deshabilitar usuario" : "Habilitar usuario"}
          disabled={props.id_rol == 3}
          onClick={() => cambiarHabilitado(props.id)}
        >
          {props.estado ? <i className="fa-solid fa-user"></i> : <i className="fa-solid fa-user-slash"></i>}
        </WhiteIconButton>
        <DangerIconButton 
          title="Eliminar usuario"
          disabled={props.id_rol == 3}
          onClick={openBorrar}
        ><i className="fa-solid fa-trash-can"></i></DangerIconButton>
      </DivCardButtons>
    </DivCard>
  );
};

export default UserCard;