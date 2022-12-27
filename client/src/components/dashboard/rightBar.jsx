import React from "react";
import ProfilePic from "../globals/profilePic";
import CalendarMini from "../calendar/calendarMini";
import { useWindowHeight } from "../../hooks/useWindowHeight";
import { useNavigate } from "react-router-dom";
import Notifications from "./notifications/notifications";
import { PhotoContainer, ProfilePencil, RightContainer, UpbarName, UpbarSquares } from "../../styles/pages/dashboard";

const RightBar = ({ user, calendar, openNav, setOpenNav }) => {
  const navigate = useNavigate();
  const windowHeight = useWindowHeight();

  return (
    <RightContainer onClick={() => openNav && setOpenNav(!openNav)} height={windowHeight} calendar={calendar}>
      <UpbarSquares>
        <UpbarName>{user?.nombre}</UpbarName>
        <Notifications />
        <PhotoContainer onClick={() => { navigate('/dashboard/profile'); window.scroll(0, 0); }}>
          <ProfilePic
            width="52px"
            height="52px"
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