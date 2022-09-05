// theme.ts
import { DefaultTheme } from "styled-components";
export const defaultTheme: DefaultTheme = {
  borderRadius: "4px",
  palette: {
    common: {
      black: "#222831",
      white: "#ffffff",
    },
    primary: {
      main: "#726a95",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#709fb0",
      contrastText: "#ffffff",
    },
  },
  background: "var(--light-background)",
  text: "var(--light-text)",
};

export const darkTheme: DefaultTheme = {
  ...defaultTheme,
  background: "var(--dark-background)",
  text: "var(--dark-text)",
};

export const lightTheme: DefaultTheme = {
  ...defaultTheme,
  background: "var(--light-background)",
  text: "var(--light-text)",
};
