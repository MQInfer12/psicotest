import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logOut } from "../services/auth";

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
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const resprof = await getProfile();
      const resprofJson = await resprof?.json();
      setUser(resprofJson);
    })()
  }, []);

  return(
    <DivHome>
      <H1Title>Hola {user.nombre?.split(" ")[0]}</H1Title>
      <button onClick={ () => { logOut(); navigate('/'); }}>Cerrar sesión</button>
    </DivHome>
  );
}

export default Home;