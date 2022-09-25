import React from "react";
import styled from "styled-components";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { logOut, getProfile } from "../services/auth";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import Cargando from "../components/globals/cargando";

const DivHome = styled.div`
  height: 100vh;
`;

const Navbar = styled.nav`
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #9c27b0;
  padding: 20px;
`;

const H2Bienvenida = styled.h2`
  color: #f8f9fa;
`;

const UlNavbar = styled.ul`
  list-style: none;
  display: flex;
  gap: 40px;

  & > button {
    border: none;
    background-color: transparent;
    font-size: 1rem;
    cursor: pointer;
    color: #f8f9fa;
  }

  & > button:hover {
    color: #9b9b9b;
  }
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  //AL RENDERIZARSE EL COMPONENTE//
  useEffect(() => {
    //si el user es indefinido obtener el user, si no, mostrar la pantalla
    if(user == undefined) {
      (async () => {
        const userPromise = await getProfile();
        setUser(userPromise);
        setLoading(false);
      })()
    } else {
      setLoading(false);
    }
  }, []);

  //AL CAMBIAR LA VARIABLE USER//
  const [effects, setEffects] = useState(false);
  useEffect(() => {
    if(effects) {
      if(user == undefined) navigate("/"); 
    }

    //DA PASO AL USE EFFECT//
    setEffects(true);
  }, [user]);
  
  //BOTON CERRAR SESION//
  const handleLogout = async () => {
    const resout = await logOut();
    const resoutJson = await resout?.json();
    if(resoutJson.message == "Successfully logged out") {
      setUser(undefined);
      navigate("/");
    }
  }

  return(
    <DivHome>
      {
        loading? (
          <Cargando />
        ) : (
          <>
            <Navbar>
              <H2Bienvenida>Hola { user?.nombre }</H2Bienvenida>
              <UlNavbar>
                { user?.id_rol == "3" && <Link to="./users">Usuarios</Link>}
                { user?.id_rol == "2" && <Link to="./groups">Grupos</Link>}
                <button onClick={ handleLogout }>Cerrar sesión</button>
              </UlNavbar>
            </Navbar>
            <Outlet />
          </>
        )
      }
    </DivHome>
  );
}

export default Dashboard;