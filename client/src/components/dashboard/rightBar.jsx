import React from "react";
import styled from "styled-components";
import ProfilePic from "../globals/profilePic";
import CalendarMini from "../calendar/calendarMini";
import { device } from "../../styles/devices";
import { useWindowHeight } from "../../hooks/useWindowHeight";
import { useNavigate } from "react-router-dom";
import Notifications from "./notifications/notifications";

const RightBar = ({ user, calendar, openNav, setOpenNav }) => {
  const navigate = useNavigate();
  const windowHeight = useWindowHeight();

  return (
    <RightContainer onClick={() => openNav && setOpenNav(!openNav)} height={windowHeight} calendar={calendar}>
      <UpbarSquares>
        <UpbarName>{user?.nombre}{/* {user?.id} */}</UpbarName>
        <Notifications />
        <PhotoContainer onClick={() => {navigate('/dashboard/profile'); window.scroll(0, 0);}}>
          <ProfilePic 
            width="52px"
            height="52px"
            id={user?.id}
            perfil={user?.perfil}
          />
          <ProfilePencil className="pencil">
            <i className="fa-solid fa-square-pen"></i>
          </ProfilePencil>
        </PhotoContainer>
      </UpbarSquares>
      {
        calendar &&
        <CalendarMini />
      }
    </RightContainer>
  )
}

export default RightBar;

const RightContainer = styled.aside`
  background-color: ${props => props.calendar? "#FFFFFF" : "transparent"};
  position: ${props => props.calendar? "fixed" : "absolute"};
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
 
const UpbarSquares = styled.div`
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

const UpbarName = styled.p`
  max-width: 200px;
  text-align: center;
  font-weight: 300;
  font-size: 16px;
  color: #ADA7A7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const PhotoContainer = styled.div`
  position: relative;

  &:hover {
    .pencil {
      opacity: 1;
    }
  }
`;

const ProfilePencil = styled.div`
  opacity: 0;
  background-color: rgb(0, 0, 0, 0.4);
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
  color: #FFFFFF;
  cursor: pointer;
`;