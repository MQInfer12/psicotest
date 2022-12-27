import React from "react";
import Logo from "../../assets/dashboard/logopsico.png";
import LogoutButton from "./logoutButton";
import { useWindowHeight } from "../../hooks/useWindowHeight";
import { SideBarContainer, SideBarIcon, SideBarLink, SideBarList, SideBarLogo, SideBarOptionText } from "../../styles/pages/dashboard";

const SideBar = ({ rol, setUser, openNav, setOpenNav }) => {
  const windowHeight = useWindowHeight();

  const handleChangePage = () => {
    window.scroll(0, 0);
    openNav && setOpenNav(false);
  }

  const linksData = [
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