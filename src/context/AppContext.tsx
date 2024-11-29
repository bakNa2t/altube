import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Video, Videos } from "pexels";

import { ITranslations, LANGUAGE } from "../utils/translations";
import { client } from "../utils/pexeles/config";

interface IAppContextVlaue {
  theme: "light" | "dark";
  language: "english" | "russian";
  toggleLanguage: () => void;
  toggleTheme: () => void;
  text: ITranslations;
  searchBarText: string;
  setSearchBarText: Dispatch<SetStateAction<string>>;
  isSideMenuShort: boolean;
  toggleSideMenuShortResize: () => void;
  activeMenuLink: string;
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
  dataVideos: Video[];
  isFetchingVideos: boolean;
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
  const [activeMenuLink /*, setActiveMenuLink*/] = useState("home");
  const [activeCategory, setActiveCategory] = useState("Sports");
  const [dataVideos, setDataVideos] = useState<Video[]>([]);
  const [isFetchingVideos, setIsFetcingVideos] = useState(false);

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((language) => (language === "english" ? "russian" : "english"));
  };

  const toggleSideMenuShortResize = () => {
    setIsSideMenuShort((state) => !state);
  };

  useEffect(() => {
    fetchVideos(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    fetchVideos(searchBarText);
  }, [searchBarText]);

  const value = {
    theme,
    language,
    text: LANGUAGE[language],
    toggleLanguage,
    toggleTheme,
    searchBarText,
    setSearchBarText,
    isSideMenuShort,
    toggleSideMenuShortResize,
    activeMenuLink,
    activeCategory,
    setActiveCategory,
    dataVideos,
    isFetchingVideos,
  };

  const fetchVideos = async (query: string) => {
    setIsFetcingVideos(true);

    try {
      if (!query) return Error("Query is empty");

      // const response = await fetch(
      //   `https://api.pexels.com/v1/search?query=${query}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: pexelsConfig.api_key,
      //       "Content-Type": "application/json",
      //     },
      //     mode: "no-cors",
      //   }
      // );

      const response = await client.videos.search({ query, per_page: 44 });
      setDataVideos((response as Videos).videos);
      // console.log((response as Videos).videos);
    } catch (error) {
      console.error(error);
    }

    setIsFetcingVideos(false);
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
