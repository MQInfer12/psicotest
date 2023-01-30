import React from "react";
import LogoutButton from "./logoutButton";
import { useWindowHeight } from "../../hooks/useWindowHeight";
import { SideBarContainer, SideBarIcon, SideBarLink, SideBarList, SideBarOptionText, ThemeChangerButton, ThemeChangerContainer } from "../../styles/pages/dashboard";
import { PageTitle } from "../../styles/pages/landing";
import Logo from "../../assets/logo/logo.png"
import { useThemeContext } from "../../context/themeContext";

const SideBar = ({ rol, setUser, openNav, setOpenNav }) => {
  const windowHeight = useWindowHeight();
  const { theme, setTheme } = useThemeContext();

  const handleChangePage = () => {
    window.scroll(0, 0);
    openNav && setOpenNav(false);
  }

  const linksData = [
    {
      roles: [1, 2, 3],
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
      roles: [1, 2, 3], 
      select: "chat",
      title: "Chat",
      goTo: "./chat",
      icon: "fa-solid fa-comments",
    },
    {
      roles: [1, 2, 3],
      select: "calendar",
      title: "Calendario",
      goTo: "./calendar",
      icon: "fa-solid fa-calendar-days",
    },
    {
      roles: [1, 2, 3],
      select: "blogs",
      title: "Blogs",
      goTo: "./blogs",
      icon: "fa-solid fa-newspaper",
    },
    {
      roles: [3],
      select: "users",
      title: "Usuarios",
      goTo: "./users",
      icon: "fa-solid fa-user-group",
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
    <SideBarContainer height={windowHeight} openNav={openNav}>
      <PageTitle><img src={Logo}/><div><span>Psico</span>test</div></PageTitle>
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
      <ThemeChangerContainer>
        <ThemeChangerButton bg="#660BE1" act={theme === "original"} onClick={() => setTheme("original")} />
        <ThemeChangerButton bg="#121212" act={theme === "dark"} onClick={() => setTheme("dark")} />
      </ThemeChangerContainer>
    </SideBarContainer>
  )
}

export default SideBar;