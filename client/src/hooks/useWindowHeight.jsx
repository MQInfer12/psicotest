import { useEffect } from 'react';
import { useState } from 'react'

export const useWindowHeight = (upbar = false, paddingbot = false) => {
  const getWH = () => {
    let wh = window.innerHeight;
    if(upbar) {
      wh -= 157;
    }
    if(paddingbot) {
      wh -= 40;
    }
    return wh;
  }

  const [windowHeight, setWindowHeight] = useState(getWH() + "px");

  useEffect(() => {
    window.addEventListener("resize", () => setWindowHeight(getWH() + "px"));
  }, []);

  return windowHeight;
}