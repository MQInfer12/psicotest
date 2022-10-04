import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const CenterContainer = styled.div`
  margin-left: 263px;
  margin-right: ${props => props.calendar && "433px"};
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

const OutletContainer = styled.div`
  height: calc(100vh - 157px);
  overflow: scroll;
  overflow-x: hidden;
  padding: 0px 40px 40px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #ADA7A7;
  }

  &::-webkit-scrollbar-thumb {
    background: #660BE1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #660BE1;
  }

`;

const CenterScreen = ({ titlePage, setTitlePage, setCalendar, calendar }) => {
  return (
    <CenterContainer calendar={calendar}>
      <UpbarContainer>
        <UpbarText>
          <ActualPage>Admin / Creación Tests</ActualPage>
          <TitlePage>{ titlePage }</TitlePage>
        </UpbarText>
      </UpbarContainer>
      <OutletContainer>
        <Outlet context={{setTitlePage, setCalendar}} />
      </OutletContainer>
    </CenterContainer>
  )
}

export default CenterScreen;