import React from "react";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { getProfile, signIn } from "../../services/auth";
import { ButtonModal, DivAlerta, DivAlertaText, DivButtons, DivIcon, H2Title, PText } from "../../styles/pages/login";

const ModalRegister = ({ goTo, form, cerrar }) => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const iniciarSesion = async () => {
    const res = await signIn(form);
    if(res.ok) {
      const profile = await getProfile();
      const resJson = await profile?.json();
      setUser({ ...resJson, isLogged: true });
      navigate(goTo ? goTo.replaceAll("_47slash_", "/") : "/dashboard/tests");
      cerrar();
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