import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services/usuario";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";

const DivHome = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const H1Title = styled.h1`
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: 2.2em;
  line-height: 3rem;
  color: #1a3260;
`;

const Home = () => {
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const resout = await logOut();
    const resoutJson = await resout?.json();
    if(resoutJson.message == "Successfully logged out") {
      setUser(null);
      navigate("/");
    }
  }

  return(
    <DivHome>
      <H1Title>Hola { user?.nombre }</H1Title>
      <button onClick={ handleLogout }>Cerrar sesión</button>
      { user?.id_rol == "3"? <H1Title>Administrador</H1Title> : "" } 
    </DivHome>
  );
}

export default Home;