import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { useThemeMode } from "../hooks/useThemeMode";
import { lightTheme, darkTheme } from "../theme/theme";

type IThemeContextProps = {
  children?: React.ReactNode;
  customTheme?: DefaultTheme;
};

const ThemeContext: React.FC<IThemeContextProps> = ({
  children,
  customTheme = {},
}) => {
  const { theme } = useThemeMode();

  const themeMode = theme === "dark" ? darkTheme : lightTheme;
  // extend user theme;
  const userTheme = { ...themeMode, ...customTheme };

  return <ThemeProvider theme={userTheme}>{children}</ThemeProvider>;
};

export default ThemeContext;
