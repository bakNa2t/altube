import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ITranslations, LANGUAGE } from "../utils/translations";
import {
  BASE_URL,
  CHANNEL_URL,
  COMMENTS_URL,
  options,
  VIDEO_URL,
} from "../utils/rapid-api/config";
import { VideoProps } from "../interfaces/videos";
import { IVideoDetails } from "../interfaces/videoDetails";
import { useAppDispatch, useAppSelector } from "../store/store";
import { switchThemeColor, switchTranslation } from "../store/appSlice";
import { IVideoComments } from "../interfaces/videoComments";
import { IChannelDetails } from "../interfaces/channelDetails";

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
  fetchVideoById: IVideoDetails | undefined;
  fetchFromApibyId: (id: string | undefined) => Promise<void>;
  isAppbodyPath: boolean;
  showSettings: boolean;
  toggleSettingsDropMenu: () => void;
  fetchVideoComments: IVideoComments[];
  fetchVideoCommentsById: (id: string | undefined) => Promise<void>;
  fetchChannelDdetails: IChannelDetails;
  fetchChannelDetailsById: (id: string | undefined) => Promise<void>;
}

interface IAppContextProps {
  children: ReactNode;
}

const AppContext = createContext<IAppContextVlaue | null>(null);

export const AppContextProvider = ({ children }: IAppContextProps) => {
  const [searchBarText, setSearchBarText] = useState("");
  const [isSideMenuShort, setIsSideMenuShort] = useState(false);
  const [activeMenuLink /*, setActiveMenuLink*/] = useState("home");
  const [activeCategory, setActiveCategory] = useState("New");
  const [dataVideos, setDataVideos] = useState<VideoProps[]>([]);
  const [isFetchingVideos, setIsFetcingVideos] = useState(false);
  const [watchVideoItem, setWatchVideoItem] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);
  const [fetchVideoById, setFetchVideoById] = useState<
    IVideoDetails | undefined
  >(undefined);
  const [fetchVideoComments, setFetchVideoComments] = useState<
    IVideoComments[]
  >([]);
  const [fetchChannelDdetails, setFetchChannelDetails] =
    useState<IChannelDetails>({} as IChannelDetails);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isAppbodyPath = pathname.length === 1;

  // Toggle dark and light theme
  const toggleTheme = () => {
    dispatch(switchThemeColor());
  };

  // Toggle english and russian
  const toggleLanguage = () => {
    dispatch(switchTranslation());
  };

  // Toggle sidemenu sizing
  const toggleSideMenuShortResize = () => {
    setIsSideMenuShort((state) => !state);
  };

  // Toggle header settings drop menu
  const toggleSettingsDropMenu = () => {
    setShowSettings((state) => !state);
  };

  // Fetch videos data by category
  useEffect(() => {
    fetchFromApi(
      `search?q=${activeCategory}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`
    );
  }, [activeCategory]);

  // Fetch videos data by search input
  useEffect(() => {
    if (searchBarText.trim() === "") {
      return;
    }
    fetchFromApi(
      `search?q=${searchBarText}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`
    );
    setIsFetcingVideos(false);
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

  // Fetch video comments by id
  const fetchVideoCommentsById = async (id: string | undefined) => {
    try {
      setIsFetcingVideos(true);
      const response = await fetch(
        `${COMMENTS_URL}${id}&maxResults=100`,
        options
      );
      const result = await response.text();
      const data = JSON.parse(result);

      setFetchVideoComments(data.items);

      // console.log(data.items);
      setIsFetcingVideos(false);
    } catch (error) {
      console.error(error);
      setIsFetcingVideos(false);
    }
  };

  //Fetch channel details by id
  const fetchChannelDetailsById = async (id: string | undefined) => {
    try {
      setIsFetcingVideos(true);
      const response = await fetch(`${CHANNEL_URL}${id}`, options);
      const result = await response.text();
      const data = JSON.parse(result);

      setFetchChannelDetails(data.items[0]);

      console.log(data.items);
      setIsFetcingVideos(false);
    } catch (error) {
      console.error(error);
      setIsFetcingVideos(false);
    }
  };

  const value = {
    theme: useAppSelector((state) => state.app.theme),
    language: useAppSelector((state) => state.app.language),
    text: LANGUAGE[
      useAppSelector((state) => state.app.language) as keyof typeof LANGUAGE
    ],
    toggleLanguage,
    toggleTheme,
    searchBarText,
    setSearchBarText,
    isSideMenuShort,
    toggleSideMenuShortResize,
    activeMenuLink:
      LANGUAGE[
        useAppSelector((state) => state.app.language) as keyof typeof LANGUAGE
      ][activeMenuLink as keyof ITranslations],
    activeCategory,
    setActiveCategory,
    dataVideos,
    isFetchingVideos,
    watchVideoItem,
    setWatchVideoItem,
    fetchVideoById,
    fetchFromApibyId,
    isAppbodyPath,
    showSettings,
    toggleSettingsDropMenu,
    fetchVideoComments,
    fetchVideoCommentsById,
    fetchChannelDdetails,
    fetchChannelDetailsById,
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
