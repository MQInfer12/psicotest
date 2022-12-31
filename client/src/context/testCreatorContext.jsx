import React, { createContext, useContext, useState } from "react";

export const TestCreatorContext = createContext(null);

export const useTestCreatorContext = () => {
  const context = useContext(TestCreatorContext);
  if (!context) {
    throw new Error(
      "this contexts must be used whitin a TestCreatorContextProvider"
    );
  }
  return context;
};

export const TestCreatorContextProvider = ({ children }) => {
  const [secciones, setSecciones] = useState([]);
  const [seccionActual, setSeccionActual] = useState(0);
  const [option, setOption] = useState(0);

  const value = { 
    seccionActual, 
    setSeccionActual, 
    option, 
    setOption, 
    secciones, 
    setSecciones, 
    seccion: seccionActual < secciones.length ? secciones[seccionActual] : undefined
  }

  return (
    <TestCreatorContext.Provider value={value}>
      { children }
    </TestCreatorContext.Provider>
  )
}