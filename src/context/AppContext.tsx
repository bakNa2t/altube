import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { ITranslations, LANGUAGE } from "../utils/translations";
import { BASE_URL, options, VIDEO_URL } from "../utils/rapid-api/config";
import { VideoProps } from "../interfaces/videos";

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
  dataVideos: VideoProps[];
  isFetchingVideos: boolean;
  watchVideoItem: string;
  setWatchVideoItem: Dispatch<SetStateAction<string>>;
  fetchVideoById: any[] | undefined;
  fetchFromApibyId: (id: string | undefined) => Promise<void>;
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
  const [dataVideos, setDataVideos] = useState<VideoProps[]>([]);
  const [isFetchingVideos, setIsFetcingVideos] = useState(false);
  const [watchVideoItem, setWatchVideoItem] = useState<string>("");
  const [fetchVideoById, setFetchVideoById] = useState<any[]>([]);

  const navigate = useNavigate();

  // Swap dark and light theme
  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  // Swap english and russian
  const toggleLanguage = () => {
    setLanguage((language) => (language === "english" ? "russian" : "english"));
  };

  // Swap sidemenu sizing
  const toggleSideMenuShortResize = () => {
    setIsSideMenuShort((state) => !state);
  };

  // Fetch videos data by category
  useEffect(() => {
    fetchFromApi(
      `search?q=${activeCategory}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`
    );
  }, [activeCategory]);

  // Fetch videos data by search input
  useEffect(() => {
    fetchFromApi(
      `search?q=${searchBarText}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`
    );
  }, [searchBarText]);

  // Navigate to watch video by id
  useEffect(() => {
    if (watchVideoItem !== "") {
      navigate(`/${watchVideoItem}`);
    }
  }, [watchVideoItem]);

  // Fetch videos data from API
  const fetchFromApi = async (url?: string) => {
    try {
      setIsFetcingVideos(true);
      const response = await fetch(`${BASE_URL}/${url}`, options);
      const result = await response.text();
      const data = JSON.parse(result);

      setDataVideos(data.items);
      setIsFetcingVideos(false);
    } catch (error) {
      console.error(error);
      setIsFetcingVideos(false);
    }
  };

  // Fetch videos data by id
  const fetchFromApibyId = async (id: string | undefined) => {
    try {
      setIsFetcingVideos(true);
      const response = await fetch(`${VIDEO_URL}${id}`, options);
      const result = await response.text();
      const data = JSON.parse(result);

      setFetchVideoById(data.items[0]);
      setIsFetcingVideos(false);
    } catch (error) {
      console.error(error);
      setIsFetcingVideos(false);
    }
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
    toggleSideMenuShortResize,
    activeMenuLink,
    activeCategory,
    setActiveCategory,
    dataVideos,
    isFetchingVideos,
    watchVideoItem,
    setWatchVideoItem,
    fetchVideoById,
    fetchFromApibyId,
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
