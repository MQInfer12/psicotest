import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { getProfile } from "../services/auth";
import Cargando from "../components/globals/cargando";
import SideBar from "../components/dashboard/sideBar";
import CenterScreen from "../components/dashboard/centerScreen";
import RightBar from "../components/dashboard/rightBar";

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useContext(UserContext);

  const [titlePage, setTitlePage] = useState("Home");
  const [calendar, setCalendar] = useState(false);

  const navigate = useNavigate();

  //AL RENDERIZARSE EL COMPONENTE//
  useEffect(() => {
    //si el user es indefinido obtener el user, si no, mostrar la pantalla de login
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

  return(
    <DashboardContainer>
      {
        loading? (
          <LoaderContainer>
            <Cargando />
          </LoaderContainer>
        ) : (
          <>
            <SideBar 
              rol={user?.id_rol}
              setUser={setUser}
            />
            
            <CenterScreen 
              titlePage={titlePage}
              setTitlePage={setTitlePage}
              calendar={calendar}
              setCalendar={setCalendar}
            />

            <RightBar 
              user={user}
              calendar={calendar}
            />
          </>
        )
      }
    </DashboardContainer>
  );
}

export default Dashboard;