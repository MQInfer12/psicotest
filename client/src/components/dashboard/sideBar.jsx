import React from "react";
import styled from "styled-components";
import Logo from "../../images/logopsico.png";
import { NavLink } from "react-router-dom";
import LogoutButton from "./logoutButton";

const SideBarContainer = styled.nav`
  background-color: #FFFFFF;
  width: 263px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 54px;
  position: fixed;
`;

const SideBarLogo = styled.img`
  object-fit: cover;
  width: 175px;
  height: 38px;
  background-color: #D9D9D9;
  margin-bottom: 88px;
`;

//ae2d68, c05299, ea698b, 9c5ad0, b5179e, 8e2de2

//404be3, 5d7bd5, c586dd

const SideBarList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .active {
    background-color: #660BE1; 
  }
  .active:hover {
    color: #D9D9D9;
  }
`;

const SideBarLink = styled(NavLink)`
  color: #D9D9D9;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 10px 20px 10px 20px;
  border-radius: 8px;
  transition: all 0.4s;

  &:hover {
    color: #660BE1;
  }
`;

const SideBarIcon = styled.i`
  text-align: center;
  font-size: 16px;
  width: 30px;
`;

const SideBarOptionText = styled.span`
  font-size: 16px;
  line-height: 27px;
`;

const SideBar = ({ rol, setUser }) => {

  const linksData = [
    {
      roles: [1, 2, 3], 
      select: "home",
      title: "Home",
      goTo: "./",
      icon: "fa-solid fa-house",
    },
    {
      roles: [3,2,1],
      select: "tests",
      title: "Tests",
      goTo: "./tests",
      icon: "fa-solid fa-clipboard",
    },
    {
      roles: [3],
      select: "answers",
      title: "Respuestas",
      goTo: "./answers",
      icon: "fa-regular fa-folder-open",
    },
    {
      roles: [1, 2, 3],
      select: "calendar",
      title: "Calendario",
      goTo: "./calendar",
      icon: "fa-solid fa-calendar-days",
    },
    {
      roles: [3],
      select: "users",
      title: "Usuarios",
      goTo: "./users",
      icon: "fa-solid fa-user-group",
    },
    {
      roles: [2],
      select: "groups",
      title: "Grupos",
      goTo: "./groups",
      icon: "fa-solid fa-users-line",
    },
    {
      roles: [1],
      select: "cita",
      title: "Cita",
      goTo: "./cita",
      icon: "fa-solid fa-calendar-day",
    },
    {
      roles: [1, 2, 3],
      select: "profile",
      title: "Perfil",
      goTo: "./profile",
      icon: "fa-solid fa-address-card",
    },
  ]

  return (
    <SideBarContainer>
      <SideBarLogo src={Logo} />
      <SideBarList>
        {
          linksData.map((v, i) => (
            v.roles.includes(rol) &&
            <li key={i}>
              <SideBarLink
                to={v.goTo}
              >
                <SideBarIcon className={v.icon}></SideBarIcon>
                <SideBarOptionText>{v.title}</SideBarOptionText>
              </SideBarLink>
            </li>
          ))
        }

        <LogoutButton setUser={setUser}/>
      </SideBarList>
    </SideBarContainer>
  )
}

export default SideBar;