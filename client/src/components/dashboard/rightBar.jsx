import React from "react";
import styled from "styled-components";
import ProfilePic from "../globals/profilePic";
import CalendarMini from "../calendar/calendarMini";

const RightContainer = styled.aside`
  background-color: ${props => props.calendar? "#FFFFFF" : "transparent"};
  position: ${props => props.calendar? "fixed" : "absolute"};
  height: ${props => props.calendar && "100vh"};
  right: 0;
  width: 433px;
  display: flex;
  flex-direction: column;
`;

const UpbarSquares = styled.div`
  height: 157px;
  padding: 47px 40px 31px 20px;
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: end;
`;

const UpbarName = styled.p`
  text-align: center;
  font-weight: 300;
  font-size: 16px;
  color: #ADA7A7;
`;

const UpbarNot = styled.div`
  min-width: 52px;
  height: 52px;
  border-radius: 10px;
  background-color: #D9D9D9;
`;

const RightBar = ({ user, calendar }) => {
  return (
    <RightContainer calendar={calendar}>
      <UpbarSquares>
        <UpbarName>Bienvenido {user?.nombre} {user?.id}</UpbarName>
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