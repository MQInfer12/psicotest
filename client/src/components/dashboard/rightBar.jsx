import React from "react";
import styled from "styled-components";
import ProfilePic from "../globals/profilePic";
import CalendarMini from "../calendar/calendarMini";
import { device } from "../../styles/devices";

const RightBar = ({ user, calendar }) => {
  return (
    <RightContainer calendar={calendar}>
      <UpbarSquares>
        <UpbarName>{user?.nombre}{user?.id}</UpbarName>
        <UpbarNot></UpbarNot>
        <ProfilePic 
          width="52px"
          height="52px"
          id={user?.id}
          perfil={user?.perfil}
        />
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
  height: ${props => props.calendar && "100vh"};
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
  text-align: center;
  font-weight: 300;
  font-size: 16px;
  color: #ADA7A7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 520px) {
    display: none;
  }
`;

const UpbarNot = styled.div`
  min-width: 52px;
  height: 52px;
  border-radius: 10px;
  background-color: #D9D9D9;
`;