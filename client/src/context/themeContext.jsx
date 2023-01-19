import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";

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

  const themes = {
    original: {
      principal: "#FFFFFF",
      principalRGB: "255, 255, 255",
      backgroundPrincipal: "#F4F4F4",
      colorPrincipal: "#660BE1",
      colorPrincipalRGB: "102, 11, 225",
      textColorPrincipal: "#FFFFFF",
      colorPrincipalLight: "#7613FD",
      colorPrincipalLightRGB: "118, 19, 253",
      colorPrincipalLighter: "#866EFB",
      colorPrincipalLighterRGB: "134, 110, 251",
      textPrincipal: "#ADA7A7", //#ADA7A7 //#9B9595 //#8C8C8C 
      textPrincipalRGB: "173, 167, 167",
      textSecondary: "#D9D9D9", //#D9D9D9
      textSecondaryRGB: "217, 217, 217",
      borders: "#D9D9D9",
      backgroundCard: "#E6E6E6",
      textDark: "#3E435D", //#3E435D //#1E212E
      textDarkRGB: "62, 67, 93",
      backgroundYellow: "#FAEA8E",
      textYellow: "#B3A449",
      backgroundGreen: "#D4FFEA",
      textGreen: "#179E5B",
      backgroundTable: "#EBF0FA",
      backgroundBlue: "#F0F1FA",
      textBlue: "#4F5AED",
      backgroundChat: "#3E3C61",
      backgroundChatDark: "#2F2D52",
      textError: "#D12953",
      textRed: "#DC4067",
      backgroundRed: "#FAF0F3",
    },
    dark: {
      principal: "#121212",
      principalRGB: "18, 18, 18",
      backgroundPrincipal: "#181818",
      colorPrincipal: "#853CE7",
      colorPrincipalRGB: "133, 60, 231",
      textColorPrincipal: "#FFFFFF",
      colorPrincipalLight: "#9142FD",
      colorPrincipalLightRGB: "145,66,253",
      colorPrincipalLighter: "#9E8BFC",
      colorPrincipalLighterRGB: "158, 139, 252",
      textPrincipal: "#A19B9B",
      textPrincipalRGB: "249, 249, 249",
      textSecondary: "#eaeaea",
      textSecondaryRGB: "234, 234, 234",
      borders: "#4d4d4d",
      backgroundCard: "#101010",
      textDark: "#f1f2f4",
      textDarkRGB: "241, 242, 244",
      backgroundYellow: "#645E39",
      textYellow: "#E1DBB6",
      backgroundGreen: "#55665E",
      textGreen: "#A2D8BD",
      backgroundTable: "#181819",
      backgroundBlue: "#606064",
      textBlue: "#A7ADF6",
      backgroundChat: "#3E3C61",
      backgroundChatDark: "#2F2D52",
      textError: "#E37F98",
      textRed: "#E36685",
      backgroundRed: "#646061",
    }
  }

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