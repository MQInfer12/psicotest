import React, { useRef } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { OutletContainerStyled } from '../../styles/pages/dashboard';

const OutletContainer = ({setTitlePage, setCalendar, setLinks}) => {
  const windowHeight = useWindowHeight(true);
  const [overflowY, setOverflowY] = useState(true);

  const makeVisibleY = () => {
    setOverflowY(false);
    return () => {
      setOverflowY(true);
    }
  }

  let contenedor = useRef(null);

  const handleScrollTop = () => {
    contenedor.current.scrollTop = 0;
  }

  return (
    <OutletContainerStyled overflowY={overflowY} height={windowHeight} ref={contenedor}>
      <Outlet context={{setTitlePage, setCalendar, setLinks, makeVisibleY, handleScrollTop}} />
    </OutletContainerStyled>
  )
}

export default OutletContainer