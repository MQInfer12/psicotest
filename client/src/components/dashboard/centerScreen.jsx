import React from "react";
import { useLocation } from "react-router-dom";
import { ActualPage, CenterContainer, OpenButton, StyledLink, TitlePage, UpbarContainer, UpbarText } from "../../styles/pages/dashboard";
import OutletContainer from "./outletContainer";

const CenterScreen = ({ titlePage, setTitlePage, calendar, setCalendar, links, setLinks, openNav, setOpenNav }) => {
  const location = useLocation();
  
  return (
    <CenterContainer calendar={calendar} onClick={() => openNav && setOpenNav(!openNav)}>
      <UpbarContainer>
        <OpenButton onClick={() => setOpenNav(!openNav)}><i className="fa-solid fa-bars"></i></OpenButton>
        <UpbarText>
          <ActualPage>{links}<StyledLink to={location}>{titlePage}</StyledLink></ActualPage>
          <TitlePage>{ titlePage }</TitlePage>
        </UpbarText>
      </UpbarContainer>
      <OutletContainer setTitlePage={setTitlePage} setCalendar={setCalendar} setLinks={setLinks}/>
    </CenterContainer>
  )
}

export default CenterScreen;