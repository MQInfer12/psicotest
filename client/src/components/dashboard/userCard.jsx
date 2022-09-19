import React from "react";
import styled from "styled-components";
import defaultPhoto from '../../images/defaultPhoto.jpg';

const DivCard = styled.div`
  width: 350px;
  border-radius: 20px;
  background-color: white;
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

const UserCard = ({ user }) => {
  return (
    <DivCard>
      <DivCardData>
        <PhotoPerfil src={defaultPhoto} />
        <DivCardText>
          <PText>{ user.nombre }</PText>
          <PText>Correo: { user.email }</PText>
          <PText>Genero: { user.genero }</PText>
          <PText>Edad: { user.edad }</PText>
          <PText>Rol: { user.id_rol == 1? "Beneficiario" : 
                        user.id_rol == 2? "Docente" : 
                        user.id_rol == 3? "Admin" : ""}</PText>
          <PText>Sede: { user.id_sede == 1? "Cochabamba" : 
                        user.id_sede == 2? "La Paz" : 
                        user.id_sede == 3? "El Alto" : 
                        user.id_sede == 4? "Santa Cruz" : ""}</PText>
        </DivCardText>
      </DivCardData>
      <DivCardButtons>
        <ButtonCard>Editar</ButtonCard>
        <ButtonCard>Deshabilitar</ButtonCard>
      </DivCardButtons>
    </DivCard>
  )
}

export default UserCard;