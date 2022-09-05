import * as React from "react";
import { ThemeProvider } from "styled-components";
import MultiSelect from "./MultiSelect";
import ThemeContext from "./contexts/ThemeContext";
import { lightTheme, darkTheme } from "./theme/theme";
import useThemeMode from "./hooks/useThemeMode";
import GlobalStyle from "./theme/globals";

export default function App() {
  let items: any = [
    {
      lastName: "Seward",
      firstName: "William",
    },
    {
      lastName: "Montgomery",
      firstName: "Blair",
    },
    {
      lastName: "Meriwether",
      firstName: "Lewis",
    },
    {
      lastName: "Shane",
      firstName: "Wood",
    },
    {
      lastName: "Irfan",
      firstName: "Khan",
    },
  ];

  const itemsChanged = (selectedItems: any): void => {
    console.log(selectedItems);
  };

  const inputChange = (input: any) => {
    //Input will be whatever current text is in the input
  };

  const getCustomTitle = (item: any): string => {
    return `${item.firstName} ${item.lastName}`;
  };

  const { theme } = useThemeMode();
  const themeMode = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <div className="form-group">
          <label>Assigned to</label>
          <div id="selector">
            <MultiSelect
              items={items}
              onChange={itemsChanged}
              onInputChange={inputChange}
              getItemTitle={getCustomTitle}
            />
          </div>
        </div>
      </ThemeProvider>
    </ThemeContext>
  );
}
