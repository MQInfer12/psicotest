import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../images/logopsico.png";
import { useNavigate, Link } from "react-router-dom";
import { logOut } from "../../services/auth";

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

const SideBarList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .selected {
    background-color: #660BE1;
  }
  .selected:hover {
    color: #D9D9D9;
  }
`;

const SideBarLink = styled(Link)`
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

const SideBarButton = styled.button`
  background-color: inherit;
  border: none;
  cursor: pointer;
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

const SideBar = ({ rol, setTitlePage, setUser }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("home");

  const linksData = [
    {
      roles: [1, 2, 3], 
      select: "home",
      title: "Home",
      goTo: "./",
      icon: "fa-solid fa-house",
    },
    {
      roles: [3],
      select: "tests",
      title: "Tests",
      goTo: "./tests",
      icon: "fa-solid fa-clipboard",
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
      roles: [1, 2, 3],
      select: "profile",
      title: "Perfil",
      goTo: "./profile",
      icon: "fa-solid fa-address-card",
    },
  ]

  //BOTON CERRAR SESION//
  const handleLogout = async () => {
    const resout = await logOut();
    const resoutJson = await resout?.json();
    if(resoutJson.message == "Successfully logged out") {
      setUser(undefined);
      navigate("/");
    }
  }
  
  return (
    <SideBarContainer>
      <SideBarLogo src={Logo} />
      <SideBarList>
        {
          linksData.map((v, i) => (
            v.roles.includes(rol) &&
            <li key={i}>
              <SideBarLink 
              onClick={() => {
                setSelected(v.select);
                setTitlePage(v.title);
              }}
              className={selected == v.select && "selected"} 
              to={v.goTo}
            >
              <SideBarIcon className={v.icon}></SideBarIcon>
              <SideBarOptionText>{v.title}</SideBarOptionText>
            </SideBarLink>
            </li>
          ))
        }

        <li>
          <SideBarButton onClick={ handleLogout }>
            <SideBarIcon className="fa-solid fa-right-from-bracket"></SideBarIcon>
            <SideBarOptionText>Logout</SideBarOptionText>
          </SideBarButton>
        </li>
      </SideBarList>
    </SideBarContainer>
  )
}

export default SideBar;