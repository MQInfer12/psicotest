import React, { useRef } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { device } from '../../styles/devices';
import { useWindowHeight } from '../../hooks/useWindowHeight';

const OutletContainer = ({setTitlePage, setCalendar, setLinks}) => {
  const windowHeight = useWindowHeight(true);
  let contenedor = useRef(null);

  const handleScrollTop = () => {
    contenedor.current.scrollTop = 0;
  }

  return (
    <OutletContainerStyled height={windowHeight} ref={contenedor}>
      <Outlet context={{setTitlePage, setCalendar, setLinks, handleScrollTop}} />
    </OutletContainerStyled>
  )
}

export default OutletContainer

const OutletContainerStyled = styled.div`
  height: ${props => props.height};
  overflow-y: auto;
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
