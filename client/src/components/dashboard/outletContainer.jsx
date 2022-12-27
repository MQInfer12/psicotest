import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { OutletContainerStyled } from '../../styles/pages/dashboard';

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