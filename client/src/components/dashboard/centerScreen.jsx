import React, { useState } from "react";
import styled from "styled-components";
import { Outlet, Link, useLocation } from "react-router-dom";
import { device } from "../../styles/devices";
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

const CenterContainer = styled.div`
  padding-left: 263px;
  padding-right: ${props => props.calendar && "433px"};
  background-color: #F4F4F4;
  width: 100%; 
  display: flex;
  flex-direction: column;

  @media (max-width: 1135px) {
    padding-right: 0;
  }

  @media ${device.tablet} {
    padding-left: 0;
    width: 100%;
  }
`;

const UpbarContainer = styled.div`
  display: flex;
  padding: 47px 40px 31px 40px;
  gap: 20px;
  height: 157px;
  background-color: #F4F4F4;
  align-items: center;

  @media (max-width: 1135px) {
    z-index: 1;
    width: 100%;
    position: fixed;
    top: 0;
  }

  @media ${device.tablet} {
    padding: 47px 10px 31px;
  }
`;

const OpenButton = styled.button`
  color: #ADA7A7;
  font-size: 20px;
  border: none;
  background-color: transparent;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;
  display: none;

  &:hover {
    color: #3E435D;
  }

  @media ${device.tablet} {
    display: block;
  }
`;

const UpbarText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ActualPage = styled.span`
  margin-top: 7px;
  font-weight: 300;
  font-size: 16px;
  color: #ADA7A7;
  display: flex;
  gap: 5px;
`;

const TitlePage = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #3E435D;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  color: #ADA7A7;
  display: flex;
  flex-direction: column;

  &::after {
    content: "";
    width: 0%;
    border-top: 1px solid #ADA7A7;
    transition: all 0.2s;
  }

  &:hover::after {
    width: 100%;
  }
`;