import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { themes } from "../styles/globals/themes";

export const ThemeContext = createContext(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "this contexts must be used whitin a ThemeContextProvider"
    );
  }
  return context;
};

export const ThemeContextProvider = ({ children }) => {
  const initial = localStorage.getItem("theme");
  const [theme, setTheme] = useState(initial ? initial : "original");
  const actualTheme = themes[theme];

  const value = {
    theme,
    setTheme,
    actualTheme
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={actualTheme}>
        { children }
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}