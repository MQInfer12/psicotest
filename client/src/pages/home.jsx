import React from 'react'
import { useEffect } from 'react';
import { useWindowHeight } from '../hooks/useWindowHeight';
import Secret from '../assets/home/home.mp3';
import { DivEntero } from '../styles/pages/home';

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