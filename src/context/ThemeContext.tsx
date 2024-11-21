import { createContext, ReactNode, useContext, useState } from "react";

interface IThemeContextVlaue {
  theme: "light" | "dark";
}

interface IThemeContextProps {
  children: ReactNode;
}

const ThemeContext = createContext<IThemeContextVlaue | null>(null);

export const ThemeContextProvider = ({ children }: IThemeContextProps) => {
  const [theme /*, setTheme*/] = useState<"light" | "dark">("dark");

  const value = {
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }

  return context;
};
