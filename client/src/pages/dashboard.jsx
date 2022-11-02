import React from "react";
import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import SideBar from "../components/dashboard/sideBar";
import CenterScreen from "../components/dashboard/centerScreen";
import RightBar from "../components/dashboard/rightBar";
import { useWindowHeight } from "../hooks/useWindowHeight";

const Dashboard = () => {
  const windowHeight = useWindowHeight();
  const {user, setUser} = useContext(UserContext);

  const [titlePage, setTitlePage] = useState("");
  const [calendar, setCalendar] = useState(false);
  const [links, setLinks] = useState(<></>);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return(
    <DashboardContainer height={windowHeight}>
      <SideBar 
        rol={user?.id_rol}
        setUser={setUser}
        openNav={openNav}
        setOpenNav={setOpenNav}
      />
      
      <CenterScreen 
        titlePage={titlePage}
        setTitlePage={setTitlePage}
        calendar={calendar}
        setCalendar={setCalendar}
        links={links}
        setLinks={setLinks}
        openNav={openNav}
        setOpenNav={setOpenNav}
      />

      <RightBar 
        user={user}
        calendar={calendar}
      />
    </DashboardContainer>
  );
}

export default Dashboard;

const DashboardContainer = styled.div`
  min-height: ${props => props.height};
  display: flex;

  @media (max-width: 1135px) {
    flex-direction: column;
  }
`;