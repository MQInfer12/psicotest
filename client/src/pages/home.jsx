import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import { useWindowHeight } from '../hooks/useWindowHeight';
import Secret from '../assets/home/home.mp3';

const Home = () => {
  const windowHeight = useWindowHeight(true, true);

  useEffect(() => {
    const sound = new Audio(Secret);
    setTimeout(() => sound.play(), 200);
  }, []);

  return (
    <DivEntero height={windowHeight}>
      <p>¡Es peligroso ir solo, toma esto!</p>
      <i className="fa-solid fa-mug-hot"></i>
      <p>Mauricio Molina</p>
    </DivEntero>
  )
}

export default Home;

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