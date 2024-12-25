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
  CHANNEL_PLAYLISTS_VIDEOS_URL,
  CHANNEL_URL,
  CHANNELS_VIDEOS_URL,
  COMMENTS_URL,
  options,
  VIDEO_URL,
} from "../utils/rapid-api/config";
import { VideoProps } from "../interfaces/videos";
import { IVideoDetails } from "../interfaces/videoDetails";
import { IVideoComments } from "../interfaces/videoComments";
import { IChannelDetails } from "../interfaces/channelDetails";
import { useAppDispatch, useAppSelector } from "../store/store";
import { switchThemeColor, switchTranslation } from "../store/appSlice";

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
  dataVideoById: IVideoDetails;
  fetchFromApibyId: (id: string | undefined) => Promise<void>;
  isAppbodyPath: boolean;
  showSettings: boolean;
  toggleSettingsDropMenu: () => void;
  activeNav: string | null;
  handleNavItemClick: (term: string) => void;
  fetchVideoComments: IVideoComments[];
  fetchVideoCommentsById: (id: string | undefined) => Promise<void>;
  fetchChannelDetails: IChannelDetails;
  fetchChannelDetailsById: (id: string | undefined) => Promise<void>;
  fetchChannelsVideos: VideoProps[];
  fetchChannelVideosById: (id: string | undefined) => Promise<void>;
  fetchPlaylistVideos: VideoProps[];
  fetchPlaylistVideosById: (id: string | undefined) => Promise<void>;
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
  const [activeNav, setActiveNav] = useState<string | null>(null);
  // fetch data
  const [dataVideoById, setFetchVideoById] = useState<IVideoDetails>(
    {} as IVideoDetails
  );
  const [fetchVideoComments, setFetchVideoComments] = useState<
    IVideoComments[]
  >([]);
  const [fetchChannelDetails, setFetchChannelDetails] =
    useState<IChannelDetails>({} as IChannelDetails);

  const [fetchChannelsVideos, setFetchChannelsVideos] = useState<VideoProps[]>(
    []
  );

  const [fetchPlaylistVideos, setFetchPlaylistVideos] = useState<VideoProps[]>(
    []
  );

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

  // Set active for channel's nav
  const handleNavItemClick = (term: string) => {
    setActiveNav(term);
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
      navigate(`/video/${watchVideoItem}`);
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

  // Fetch video COMMENTS by id
  const fetchVideoCommentsById = async (id: string | undefined) => {
    try {
      setIsFetcingVideos(true);
      const response = await fetch(
        `${COMMENTS_URL}${id}&maxResults=30`,
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

  //Fetch CHANNEL details by id
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

  //Fetch CHANNEL videos by id
  const fetchChannelVideosById = async (id: string | undefined) => {
    try {
      setIsFetcingVideos(true);
      const response = await fetch(
        `${CHANNELS_VIDEOS_URL}${id}&part=snippet%2Cid&order=date&maxResults=30`,
        options
      );
      const result = await response.text();
      const data = JSON.parse(result);

      setFetchChannelsVideos(data.items);

      // console.log(data.items);
      setIsFetcingVideos(false);
    } catch (error) {
      console.error(error);
      setIsFetcingVideos(false);
    }
  };

  //Fetch PLAYLIST videos by id
  const fetchPlaylistVideosById = async (id: string | undefined) => {
    try {
      setIsFetcingVideos(true);
      const response = await fetch(
        `${CHANNEL_PLAYLISTS_VIDEOS_URL}${id}=snippet&maxResults=30`,
        options
      );
      const result = await response.text();
      const data = JSON.parse(result);

      setFetchPlaylistVideos(data.items);

      // console.log(data.items);
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
    dataVideoById,
    fetchFromApibyId,
    isAppbodyPath,
    showSettings,
    toggleSettingsDropMenu,
    fetchVideoComments,
    fetchVideoCommentsById,
    fetchChannelDetails,
    fetchChannelDetailsById,
    fetchChannelsVideos,
    fetchChannelVideosById,
    fetchPlaylistVideos,
    fetchPlaylistVideosById,
    activeNav,
    handleNavItemClick,
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
