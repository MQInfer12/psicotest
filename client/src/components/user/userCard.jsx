import React, { useState } from "react";
import styled from "styled-components";
import { DangerIconButton, WhiteIconButton } from "../../styles/formularios";
import { ableUser, updateUser, deleteUser as serviceDeleteUser } from "../../services/usuario";
import Modal from "../globals/modal";
import ModalUser from "./modalUser";
import ProfilePic from "../globals/profilePic";
import SureModal from "../globals/sureModal";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";

const DivCard = styled.div`
  margin-top: 35px;
  width: 350px;
  background-color: #E6E6E6;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 20px;
  position: relative;

  & > .img {
    position: absolute;
    top: -50px;
    left: 125px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const DivCardText = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const PNombre = styled.p`
  color: #3E435D;
  font-size: 22px;
  font-weight: 600;
`;

const PRol = styled.p`
  color: #ADA7A7;
  font-size: 16px;
  font-weight: 300;
  text-transform: capitalize;
`;

const DivRow = styled.div`
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
`;

const DivColumns = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PText = styled.p`
  color: #3E435D;
  font-size: 14px;
  font-weight: 400;
  width: 110%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PGenero = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-transform: capitalize;
  color: #3E435D;
  font-size: 14px;
  font-weight: 400;
`;

const DivCardButtons = styled.div`
  padding-top: 10px;
  justify-content: center;
  display: flex;
  gap: 20px;
`;

const DivEstado = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: 12px;
  color: ${props => props.estado ? "#40dca0" : "#DC4067"};
  align-items: center;
  transition: all 0.2s;
`;

const UserCard = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
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
      console.log(newUserObj);

      await deleteDoc(doc(db, "users", String(newUserObj.uid)));
      await deleteDoc(doc(db, "userChats", String(newUserObj.uid)));

      //TODO
      //FALTA BORRAR LOS CHATS QUE INCLUYEN A ESTE USUARIO

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <DivCard estado={props.estado}>
      <ProfilePic width="100px" height="100px" id={props.id} perfil={props.perfil} />
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
                ) : (
                  <i className="fa-solid fa-venus"></i>
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
          disabled={props.id_rol == 3}
          onClick={() => setShowForm(true)}
        >
          <i className="fa-solid fa-pencil"></i>
        </WhiteIconButton>
        <WhiteIconButton
          disabled={props.id_rol == 3}
          onClick={() => cambiarHabilitado(props.id)}
        >
          {props.estado ? <i className="fa-solid fa-user"></i> : <i className="fa-solid fa-user-slash"></i>}
        </WhiteIconButton>
        <DangerIconButton 
          disabled={props.id_rol == 3}
          onClick={() => setShowDelete(true)}
        ><i className="fa-solid fa-trash-can"></i></DangerIconButton>
      </DivCardButtons>
      {showForm && 
        <Modal cerrar={() => setShowForm(false)} titulo="Editar usuario">
          <ModalUser
            call={updateUser}
            actualizar={() => {
              props.onSubmit();
              setShowForm(false);
            }}
            funcion="editar"
            user={props}
          />
        </Modal>
      }
      {showDelete && 
        <Modal cerrar={() => setShowDelete(false)} titulo="Editar usuario">
          <SureModal
            cerrar={() => setShowDelete(false)}
            sure={borrarUsuario}
            text="Se eliminarán el usuario y sus datos permanentemente"
          />
        </Modal>
      }
    </DivCard>
  );
};

export default UserCard;
