import React, { useState } from "react";
import styled from "styled-components";
import defaultPhoto from "../../images/defaultPhoto.jpg";
import { ableUser } from "../../services/usuario";
import UserModal from "./userModal";

const DivCard = styled.div`
  width: 350px;
  border-radius: 20px;
  background-color: ${(props) => (props.estado ? "white" : "#ff8080")};
  padding: 20px;
  display: flex;
  flex-direction: column;
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
//aqui quedes xd
const UserCard = (params) => {
  const [showForm, setShowForm] = useState(false);

  const cambiarHabilitado = async (id) => {
    const res = await ableUser(id);
    const resJson = await res?.json();
    if ((resJson.mensaje = "se actualizo correctamente")) {
      params.onSubmit();
    }
  };

  return (
    <DivCard estado={params.estado}>
      <DivCardData>
        <PhotoPerfil src={defaultPhoto} />
        <DivCardText>
          <PText>{params.nombre}</PText>
          <PText>Correo: {params.email}</PText>
          <PText>Genero: {params.genero}</PText>
          <PText>Edad: {params.edad}</PText>
          <PText>{params.rol}</PText>
          <PText>{params.sede}</PText>
        </DivCardText>
      </DivCardData>
      <DivCardButtons>
        <ButtonCard
          disabled={params.id_rol == 3}
          onClick={() => setShowForm(true)}
        >
          Editar
        </ButtonCard>
        <ButtonCard
          disabled={params.id_rol == 3}
          onClick={() => cambiarHabilitado(params.id)}
        >
          {params.estado ? "Deshabilitar" : "Habilitar"}
        </ButtonCard>
      </DivCardButtons>
      {showForm && (
        <UserModal
          cerrar={() => setShowForm(false)}
          actualizar={async () => {
            params.onSubmit();
          }}
          funcion="editar"
          user={params}
        />
      )}
    </DivCard>
  );
};

export default UserCard;
