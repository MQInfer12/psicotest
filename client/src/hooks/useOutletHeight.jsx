import { useEffect } from 'react';
import { useState } from 'react'

export const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight + "px");

  useEffect(() => {
    window.addEventListener("resize", () => setWindowHeight(window.innerHeight  + "px"));
  }, []);

  return windowHeight;
}