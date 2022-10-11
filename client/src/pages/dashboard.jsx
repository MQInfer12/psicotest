import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import SideBar from "../components/dashboard/sideBar";
import CenterScreen from "../components/dashboard/centerScreen";
import RightBar from "../components/dashboard/rightBar";

const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
`;

const Dashboard = () => {
  const {user, setUser} = useContext(UserContext);

  const [titlePage, setTitlePage] = useState("");
  const [calendar, setCalendar] = useState(false);
  const [links, setLinks] = useState(<></>);

  const navigate = useNavigate();

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
      <SideBar 
        rol={user?.id_rol}
        setUser={setUser}
      />
      
      <CenterScreen 
        titlePage={titlePage}
        setTitlePage={setTitlePage}
        calendar={calendar}
        setCalendar={setCalendar}
        links={links}
        setLinks={setLinks}
      />

      <RightBar 
        user={user}
        calendar={calendar}
      />
    </DashboardContainer>
  );
}

export default Dashboard;