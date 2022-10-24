import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import Secret from '../images/home.mp3';

const DivEntero = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  color: #ADA7A7;
  font-size: 16px;
  font-weight: 300;
`;

const Home = () => {
  useEffect(() => {
    const sound = new Audio(Secret);
    setTimeout(() => sound.play(), 200);
  }, []);

  return (
    <DivEntero>
      <p>¡Es peligroso ir solo, toma esto!</p>
      <i className="fa-solid fa-mug-hot"></i>
      <p>Mauricio Molina</p>
    </DivEntero>
  )
}

export default Home;