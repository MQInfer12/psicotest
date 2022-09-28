import React, { useState } from "react";
import styled from "styled-components";
import defaultPhoto from "../../images/defaultPhoto.jpg";
import { ableUser } from "../../services/usuario";
import Modal from "../globals/modal";
import ModalUser from "./modalUser";

const DivCard = styled.div`
  width: 350px;
  border-radius: 20px;
  background-color: ${(props) => (props.estado ? "white" : "#ff8080")};
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s;
  gap: 20px;
`;

const PhotoPerfil = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 10px;
`;

const DivCardData = styled.div`
  display: flex;
  gap: 20px;
`;

const DivCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PText = styled.div`
  font-size: 0.8rem;
`;

const DivCardButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const ButtonCard = styled.button`
  width: 100%;
  height: 30px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const UserCard = (props) => {
  const [showForm, setShowForm] = useState(false);

  const cambiarHabilitado = async (id) => {
    const res = await ableUser(id);
    const resJson = await res?.json();
    if ((resJson.mensaje = "se actualizo correctamente")) {
      props.onSubmit();
    }
  };

  return (
    <DivCard estado={props.estado}>
      <DivCardData>
        <PhotoPerfil src={defaultPhoto} />
        <DivCardText>
          <PText>{props.nombre_user}</PText>
          <PText>Correo: {props.email}</PText>
          <PText>Genero: {props.genero}</PText>
          <PText>Edad: {props.edad}</PText>
          <PText>Rol: {props.nombre_rol}</PText>
          <PText>Sede: {props.nombre_sede}</PText>
        </DivCardText>
      </DivCardData>
      <DivCardButtons>
        <ButtonCard
          disabled={props.id_rol == 3}
          onClick={() => setShowForm(true)}
        >
          Editar
        </ButtonCard>
        <ButtonCard
          disabled={props.id_rol == 3}
          onClick={() => cambiarHabilitado(props.id)}
        >
          {props.estado ? "Deshabilitar" : "Habilitar"}
        </ButtonCard>
      </DivCardButtons>
      {showForm && 
        <Modal cerrar={() => setShowForm(false)} >
          <ModalUser
            actualizar={() => {
              props.onSubmit();
              setShowForm(false);
            }}
            funcion="editar"
            user={props}
          />
        </Modal>
      }
    </DivCard>
  );
};

export default UserCard;
