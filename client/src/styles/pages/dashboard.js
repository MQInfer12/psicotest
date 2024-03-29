import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { device } from "../globals/devices";

export const DashboardContainer = styled.div`
  min-height: ${props => props.height};
  display: flex;
  overflow: hidden;

  @media (max-width: 1135px) {
    flex-direction: column;
  }
`;



// SIDEBAR

//ae2d68, c05299, ea698b, 9c5ad0, b5179e, 8e2de2
//404be3, 5d7bd5, c586dd

export const SideBarContainer = styled.nav`
  z-index: 5;
  background-color: ${props => props.theme.principal};
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
  gap: 27px;

  /* LO CONVIERTE EN OCULTABLE */
  @media ${device.tablet} {
    transform: scaleX(${props => props.openNav? "1" : "0"});
    box-shadow: 1px 1px 12px -7px rgba(${props => props.theme.textDarkRGB},0.6);
  }
`;

export const ThemeChangerContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ThemeChangerButton = styled.button`
  border: 1px solid ${props => props.theme.borders};
  background-color: ${props => props.bg};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: ${props => props.act && "3px solid white"};
    border-radius: 50%;
  }
`;

export const SideBarLogo = styled.img`
  object-fit: cover;
  width: 170px;
  height: 38px;
  background-color: ${props => props.theme.textSecondary};
  margin-bottom: 88px;
`;

export const SideBarList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .active {
    background-color: ${props => props.theme.colorPrincipal}; 
  }
  .active:hover {
    color: ${props => props.theme.textSecondary};
  }
`;

export const SideBarLink = styled(NavLink)`
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.4s;
  height: 47px;

  &:hover {
    color: ${props => props.theme.colorPrincipal};
  }
`;

export const SideBarIcon = styled.i`
  text-align: center;
  font-size: 16px;
  width: 30px;
`;

export const SideBarOptionText = styled.span`
  font-size: 16px;
  line-height: 27px;
`;

// LOGOUT BUTTON

export const SideBarButton = styled.button`
  background-color: inherit;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 10px 20px 10px 20px;
  border-radius: 8px;
  transition: all 0.4s;
  height: 47px;

  &:hover {
    color: ${props => props.theme.colorPrincipal};
  }
`;

// CENTER SCREEN

export const CenterContainer = styled.div`
  padding-left: 263px;
  padding-right: ${props => props.calendar && "433px"};
  background-color: ${props => props.theme.backgroundPrincipal};
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

export const UpbarContainer = styled.div`
  display: flex;
  padding: 0 40px;
  gap: 20px;
  height: 157px;
  background-color: ${props => props.theme.backgroundPrincipal};
  align-items: center;

  @media (max-height: 750px) {
    height: 110px;
  }

  @media (max-width: 1135px) {
    z-index: 4;
    width: 100%;
    position: fixed;
    top: 0;
  }

  @media ${device.tablet} {
    padding: 0 154px 0 10px;
  }
`;

export const OpenButton = styled.button`
  color: ${props => props.theme.textPrincipal};
  font-size: 20px;
  border: none;
  background-color: transparent;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;
  display: none;

  &:hover {
    color: ${props => props.theme.textDark};
  }

  @media ${device.tablet} {
    display: block;
  }
`;

export const UpbarText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //height: 100%;
  gap: 11px;
  overflow: auto;
`;

export const ActualPage = styled.span`
  width: 100%;
  //margin-top: 7px;
  font-weight: 300;
  font-size: 16px;
  color: ${props => props.theme.textPrincipal};
  display: flex;
  gap: 5px;
  white-space: nowrap;
`;

export const TitlePage = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.textDark};
  white-space: nowrap;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  color: ${props => props.theme.textPrincipal};
  display: flex;
  flex-direction: column;

  &::after {
    content: "";
    width: 0%;
    border-top: 1px solid ${props => props.theme.textPrincipal};
    transition: all 0.2s;
  }

  &:hover::after {
    width: 100%;
  }
`;

// OUTLET CONTAINER

export const OutletContainerStyled = styled.div`
  height: ${props => props.height};
  overflow-y: ${props => props.overflowY ? "auto" : "visible"};
  padding: 0px 40px 40px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.textPrincipal};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colorPrincipal};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colorPrincipal};
  }

  @media (max-width: 1135px) {
    height: max-content;
    min-height: ${props => props.height};
    overflow: visible;
    margin-top: 157px;
    
    @media (max-height: 750px) {
      margin-top: 110px;
    }
  }

  @media ${device.tablet} {
    margin-left: 0;
    width: 100%;
    padding: 0 10px 40px;
  }
`;

// RIGHTBAR

export const RightContainer = styled.aside`
  background-color: ${props => props.calendar ? props.theme.principal : "transparent"};
  position: ${props => props.calendar ? "fixed" : "absolute"};
  height: ${props => props.calendar && props.height};
  right: 0;
  width: 433px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1135px) {
    position: static;
    height: max-content;
    width: calc(100vw - 263px);
    margin-left: 263px;
  }

  @media ${device.tablet} {
    margin-left: 0;
    width: 100%;
  }
`;

export const UpbarSquares = styled.div`
  height: 157px;
  padding: 47px 40px 31px 20px;
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: end;
  z-index: 4;
  
  @media (max-height: 750px) {
    height: 110px;
  }

  @media (max-width: 1135px) {
    z-index: 4;
    position: fixed;
    top: 0;
    right: 0;
  }

  @media ${device.tablet} {
    padding: 47px 10px 31px;
  }
`;

export const UpbarName = styled.p`
  max-width: 200px;
  text-align: center;
  font-weight: 300;
  font-size: 16px;
  color: ${props => props.theme.textPrincipal};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const PhotoContainer = styled.div`
  position: relative;

  &:hover {
    .pencil {
      opacity: 1;
    }
  }
`;

export const ProfilePencil = styled.div`
  opacity: 0;
  background-color: rgb(${props => props.theme.textDarkRGB}, 0.4);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 10px;
  transition: all 0.3s;
  display: grid;
  place-content: center;
  font-size: 32px;
  color: ${props => props.theme.principal};
  cursor: pointer;
`;

// NOTIFICATIONS

export const Nots = styled.div`
  position: relative;
`;

export const UpbarNot = styled.div`
  min-width: 52px;
  height: 52px;
  border-radius: ${props => props.showNots ? "10px 10px 0 0" : "10px"};
  background-color: ${props => props.theme.principal};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.textSecondary};
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${props => props.showNots && "4px 1px 10px -7px rgba(0,0,0,0.6)"};
  transform: ${props => props.showNots && "translateY(5px)"};
`;

export const NotNumber = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${props => props.theme.colorPrincipal};
  font-size: 10px;
  color: ${props => props.theme.principal};
  display: grid;
  place-content: center;
`;

export const NotificationsContainer = styled.div`
  overflow: auto;
  overflow-x: hidden;
  width: 350px;
  min-height: 60px;
  max-height: 300px;
  background-color: ${props => props.theme.principal};
  position: absolute;
  top: 52px;
  right: -82px;
  border-radius: 10px;
  box-shadow: 4px 1px 10px -7px rgba(0,0,0,0.6);
  opacity: 1;
  display: ${props => props.showNots ? "block" : "none"};
  transform: translateY(5px);
  animation: appear 0.2s;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.textPrincipal};
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colorPrincipal};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colorPrincipal};
  }

  @keyframes appear {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    100% {
      transform: translateY(5px);
      opacity: 1;
    }
  }
`;

// MESSAGE NOTIFICATION

export const NotContainer = styled.div`
  height: 72px;
  display: flex;
  gap: 20px;
  padding: 0 20px;
`;

export const LeftDiv = styled.div`
  width: 32px;
  height: 100%;
  font-size: 20px;
  color: ${props => props.theme.textSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Line = styled.div`
  width: 0;
  height: 15px;
  border-left: 1px solid rgb(${props => props.theme.textSecondaryRGB}, 0.4);
`;

export const RightDiv = styled.div`
  width: calc(100% - 52px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
`;

export const TitleNot = styled.h5`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.textDark};
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DescripNot = styled.p`  
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.textPrincipal};
  user-select: none;
`;

export const LinkSpan = styled.button`
  position: relative;
  color: ${props => props.theme.colorPrincipal};
  cursor: pointer;
  text-decoration: none;
  background-color: transparent;
  border: none;

  &::after {
    content: "";
    width: 0;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid ${props => props.theme.colorPrincipal};
    transition: all 0.2s;
  }

  &:hover::after {
    width: 100%;
  }
`;