import React from "react";
import styled from "styled-components";
import ProfilePic from "../globals/profilePic";
import Calendar from "../../pages/calendar";

const RightContainer = styled.aside`
  background-color: ${props => props.calendar? "#FFFFFF" : "transparent"};
  position: ${props => props.calendar? "fixed" : "absolute"};
  z-index: ${props => props.calendar? "0" : "-1"};
  top:0;
  right: 0;
  height: 100vh;
  width: 433px;
  display: flex;
  flex-direction: column;
`;

const UpbarSquares = styled.div`
  height: 157px;
  padding: 47px 40px 31px 0px;
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: end;
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

const RightBar = ({ user, calendar }) => {
  return (
    <RightContainer calendar={calendar}>
      <UpbarSquares>
        <UpbarName>Bienvenido {user?.nombre}</UpbarName>
        <UpbarNot></UpbarNot>
        <ProfilePic 
          width="52px"
          height="52px"
          src={user?.perfil}
        />
      </UpbarSquares>
      {
        calendar &&
        <Calendar />
      }
    </RightContainer>
  )
}

export default RightBar;