import React from 'react';
import { useWindowHeight } from '../hooks/useWindowHeight';
import { DivEntero, PurpleIcon } from '../styles/pages/thanks';

const Thanks = () => {
  const windowHeight = useWindowHeight(true, true);

  return (
    <DivEntero height={windowHeight}>
      <PurpleIcon className="fa-solid fa-circle-check"></PurpleIcon>
      ¡Gracias por tu tiempo!
    </DivEntero>
  )
}

export default Thanks