import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getProfile, signIn } from "../../services/auth";

const ModalRegister = ({ goTo, form }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const iniciarSesion = async () => {
    const res = await signIn(form);
    if(res.ok) {
      const profile = await getProfile();
      setUser(profile);
      navigate(goTo ? goTo.replaceAll("_47slash_", "/") : "/dashboard/tests");
    } 
  }

  return (
    <DivAlerta>
      <DivAlertaText>
        <DivIcon className='fa-solid fa-check'></DivIcon>
        <H2Title>¡Exito!</H2Title>
        <PText>Se registró el usuario correctamente.</PText>
      </DivAlertaText>
      <DivButtons>
        <ButtonModal onClick={iniciarSesion}>Iniciar sesión</ButtonModal>
      </DivButtons>
    </DivAlerta>
  )
}

export default ModalRegister;

const DivAlerta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  gap: 10px;
`;

const DivAlertaText = styled.div`
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: space-around;
`;

const DivIcon = styled.i`
  font-size: 100px;
  color: #2196f3;
`;

const H2Title = styled.h2`
  font-size: 1.2rem;
  color: #1a3260;
`;

const PText = styled.p`
  font-size: 1rem;
  color: #808291;
`;

const DivButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ButtonModal = styled.button`
  text-decoration: none;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1rem;
  background: linear-gradient(to right, #ff512f, #dd2476);
  box-shadow: 0px 0px 50px 0px rgb(0 0 0 / 10%);
  color: #f8f9fa;

  &:hover {
    background: linear-gradient(to right, #8e2de2, #4a00e0);
  }
`;