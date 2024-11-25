import { createContext, ReactNode, useContext, useState } from "react";

import { ITranslations, LANGUAGE } from "../utils/translations";

interface IAppContextVlaue {
  theme: "light" | "dark";
  language: "english" | "russian";
  toggleLanguage: () => void;
  text: ITranslations;
}

interface IAppContextProps {
  children: ReactNode;
}

const AppContext = createContext<IAppContextVlaue | null>(null);

export const AppContextProvider = ({ children }: IAppContextProps) => {
  const [theme /*, setTheme*/] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState<"english" | "russian">("english");

  const toggleLanguage = () => {
    setLanguage((language) => (language === "english" ? "russian" : "english"));
  };

  const value = {
    theme,
    language,
    toggleLanguage,
    text: LANGUAGE[language],
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return context;
};
