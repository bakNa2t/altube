import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { ITranslations, LANGUAGE } from "../utils/translations";

interface IAppContextVlaue {
  theme: "light" | "dark";
  language: "english" | "russian";
  toggleLanguage: () => void;
  toggleTheme: () => void;
  text: ITranslations;
  searchBarText: string;
  setSearchBarText: Dispatch<SetStateAction<string>>;
  isSideMenuShort: boolean;
  toggleSideMenuSortResize: () => void;
}

interface IAppContextProps {
  children: ReactNode;
}

const AppContext = createContext<IAppContextVlaue | null>(null);

export const AppContextProvider = ({ children }: IAppContextProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState<"english" | "russian">("english");
  const [searchBarText, setSearchBarText] = useState("");
  const [isSideMenuShort, setIsSideMenuShort] = useState(false);

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((language) => (language === "english" ? "russian" : "english"));
  };

  const toggleSideMenuSortResize = () => {
    setIsSideMenuShort((state) => !state);
  };

  const value = {
    theme,
    language,
    text: LANGUAGE[language],
    toggleLanguage,
    toggleTheme,
    searchBarText,
    setSearchBarText,
    isSideMenuShort,
    toggleSideMenuSortResize,
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
