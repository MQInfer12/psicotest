import React from 'react'
import styled from 'styled-components';
import { useWindowHeight } from '../hooks/useWindowHeight';

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

const DivEntero = styled.div`
  height: ${props => props.height};
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  color: #ADA7A7;
  font-size: 16px;
  font-weight: 300;
`;

const PurpleIcon = styled.i`
  font-size: 100px;
  color: #660BE1;
  animation: appear 2s ease;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;