import React from "react";
import styled from "styled-components";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { logOut, getProfile } from "../services/auth";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import Cargando from "../components/globals/cargando";
import Logo from '../images/logopsico.png';
import ProfilePic from "../components/globals/profilePic";

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
`;

const SideBar = styled.nav`
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

const RightContainer = styled.div`
  margin-left: 263px;
  background-color: #F4F4F4;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UpbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 47px 40px 31px 40px;
  height: 157px;
`;

const UpbarText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActualPage = styled.span`
  margin-top: 7px;
  font-weight: 300;
  font-size: 16px;
  color: #ADA7A7;
`;

const TitlePage = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #3E435D;
`;

const UpbarSquares = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const UpbarName = styled.p`
  font-weight: 300;
  font-size: 16px;
  color: #ADA7A7;
`;

const UpbarNot = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background-color: #D9D9D9;
`;

const OutletContainer = styled.div`
  min-height: calc(100vh - 157px);
  padding: 0px 40px 40px 40px;
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useContext(UserContext);

  const [selected, setSelected] = useState("home");
  const [titlePage, setTitlePage] = useState("Home");

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
  
  //BOTON CERRAR SESION//
  const handleLogout = async () => {
    const resout = await logOut();
    const resoutJson = await resout?.json();
    if(resoutJson.message == "Successfully logged out") {
      setUser(undefined);
      navigate("/");
    }
  }

  return(
    <DashboardContainer>
      {
        loading? (
          <LoaderContainer>
            <Cargando />
          </LoaderContainer>
        ) : (
          <>
            <SideBar>
              <SideBarLogo src={Logo} />
              <SideBarList>
                <li>
                  <SideBarLink 
                    onClick={() => {
                      setSelected("home");
                      setTitlePage("Home");
                    }}
                    className={selected == "home" && "selected"} 
                    to="./" 
                  >
                    <SideBarIcon className="fa-solid fa-house"></SideBarIcon>
                    <SideBarOptionText>Home</SideBarOptionText>
                  </SideBarLink>
                </li>

                {
                  user?.id_rol == "3" && 
                  <li>
                    <SideBarLink 
                      onClick={() => {
                        setSelected("tests");
                        setTitlePage("Tests");
                      }}
                      className={selected == "tests" && "selected"} 
                      to="./tests"
                    >
                      <SideBarIcon className="fa-solid fa-clipboard"></SideBarIcon>
                      <SideBarOptionText>Tests</SideBarOptionText>
                    </SideBarLink>
                  </li>
                }
                
                <li>
                  <SideBarLink 
                    onClick={() => {
                      setSelected("calendar");
                      setTitlePage("Calendario");
                    }}
                    className={selected == "calendar" && "selected"} 
                    to="./calendar" 
                  >
                    <SideBarIcon className="fa-solid fa-calendar-days"></SideBarIcon>
                    <SideBarOptionText>Calendario</SideBarOptionText>
                  </SideBarLink>
                </li>

                {
                  user?.id_rol == "3" && 
                  <li>
                    <SideBarLink 
                      onClick={() => {
                        setSelected("users");
                        setTitlePage("Usuarios");
                      }}
                      className={selected == "users" && "selected"} 
                      to="./users"
                    >
                      <SideBarIcon className="fa-solid fa-user-group"></SideBarIcon>
                      <SideBarOptionText>Usuarios</SideBarOptionText>
                    </SideBarLink>
                  </li>
                }

                {
                  user?.id_rol == "2" && 
                  <li>
                    <SideBarLink 
                      onClick={() => {
                        setSelected("groups");
                        setTitlePage("Grupos");
                      }}
                      className={selected == "groups" && "selected"} 
                      to="./groups" 
                    >
                      <SideBarIcon className="fa-solid fa-users-line"></SideBarIcon>
                      <SideBarOptionText>Grupos</SideBarOptionText>
                    </SideBarLink>
                  </li>
                }

                <li>
                  <SideBarLink 
                    onClick={() => {
                      setSelected("profile");
                      setTitlePage("Perfil");
                    }}
                    className={selected == "profile" && "selected"} 
                    to="./profile" 
                  >
                    <SideBarIcon className="fa-solid fa-address-card"></SideBarIcon>
                    <SideBarOptionText>Perfil</SideBarOptionText>
                  </SideBarLink>
                </li>

                <li>
                  <SideBarButton onClick={ handleLogout }>
                    <SideBarIcon className="fa-solid fa-right-from-bracket"></SideBarIcon>
                    <SideBarOptionText>Logout</SideBarOptionText>
                  </SideBarButton>
                </li>
              </SideBarList>
            </SideBar>
            <RightContainer>
              <UpbarContainer>
                <UpbarText>
                  <ActualPage>Admin / Creación Tests</ActualPage>
                  <TitlePage>{ titlePage }</TitlePage>
                </UpbarText>
                <UpbarSquares>
                  <UpbarName>Bienvenido {user?.nombre}</UpbarName>
                  <UpbarNot></UpbarNot>
                  <ProfilePic 
                    width="52px"
                    height="52px"
                    src={user?.perfil}
                  />
                </UpbarSquares>
              </UpbarContainer>
              <OutletContainer>
                <Outlet />
              </OutletContainer>
            </RightContainer>
          </>
        )
      }
    </DashboardContainer>
  );
}

export default Dashboard;