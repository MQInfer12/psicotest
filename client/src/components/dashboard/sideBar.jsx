import React from "react";
import styled from "styled-components";
import Logo from "../../assets/dashboard/logopsico.png";
import { NavLink } from "react-router-dom";
import LogoutButton from "./logoutButton";
import { device } from "../../styles/globals/devices";
import { useWindowHeight } from "../../hooks/useWindowHeight";

const SideBar = ({ rol, setUser, openNav, setOpenNav }) => {
  const windowHeight = useWindowHeight();

  const handleChangePage = () => {
    window.scroll(0, 0);
    openNav && setOpenNav(false);
  }

  const linksData = [
    /*{
      roles: [1, 2, 3], 
      select: "home",
      title: "Home",
      goTo: "./",
      icon: "fa-solid fa-house",
    },*/
    {
      roles: [3,2,1],
      select: "tests",
      title: "Tests",
      goTo: "./tests",
      icon: "fa-solid fa-clipboard",
    },
    {
      roles: [2, 3],
      select: "answers",
      title: "Respuestas",
      goTo: "./answers",
      icon: "fa-regular fa-folder-open",
    },
    {
      roles: [1, 2], 
      select: "chat",
      title: "Chat",
      goTo: "./chat",
      icon: "fa-solid fa-comments",
    },
    {
      roles: [2],
      select: "blogs",
      title: "Blogs",
      goTo: "./blogs",
      icon: "fa-solid fa-newspaper",
    },
    {
      roles: [1, 2],
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
    /* {
      roles: [2],
      select: "groups",
      title: "Grupos",
      goTo: "./groups",
      icon: "fa-solid fa-users-line",
    }, */
    {
      roles: [1, 2, 3],
      select: "profile",
      title: "Perfil",
      goTo: "./profile",
      icon: "fa-solid fa-address-card",
    },
  ]

  return (
    <SideBarContainer height={windowHeight} openNav={openNav}>
      <SideBarLogo src={Logo} />
      <SideBarList>
        {
          linksData.map((v, i) => (
            v.roles.includes(rol) &&
            <li key={i}>
              <SideBarLink
                to={v.goTo}
                onClick={handleChangePage}
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

const SideBarContainer = styled.nav`
  z-index: 5;
  background-color: #FFFFFF;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 54px 0;
  overflow: hidden;
  transition: transform 0.4s;
  transform-origin: left;
  position: fixed;
  width: 263px;

  @media ${device.tablet} {
    transform: scaleX(${props => props.openNav? "1" : "0"});
    box-shadow: 4px 1px 16px -7px rgba(0,0,0,0.6);
  }
`;

const SideBarLogo = styled.img`
  object-fit: cover;
  width: 170px;
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
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.4s;
  height: 47px;

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