import { MdHome } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { BsCollectionPlay } from "react-icons/bs";
import { PiMonitorPlayFill } from "react-icons/pi";
import { MdOutlineFeedback } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { CgFlag } from "react-icons/cg";
import { PiGearBold } from "react-icons/pi";
import { SiYoutubemusic } from "react-icons/si";
import { TbBrandYoutubeKids } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LiaFireAltSolid } from "react-icons/lia";
import { PiMusicNoteBold } from "react-icons/pi";
import { BiMoviePlay } from "react-icons/bi";
import { CgMediaLive } from "react-icons/cg";
import { SiYoutubegaming } from "react-icons/si";
import { RiNewspaperLine } from "react-icons/ri";
import { GiTrophyCup } from "react-icons/gi";

export const MENU_ITEMS_SHORT = [
  { name: "home", icon: <MdHome /> },
  { name: "shorts", icon: <SiYoutubeshorts /> },
  { name: "subscriptions", icon: <BsCollectionPlay /> },
  { name: "you", icon: <PiMonitorPlayFill /> },
  { name: "history", icon: <MdHistory /> },
];

export const MENU_ITEMS_FULL = [
  {
    title: "",
    list: [
      { name: "home", icon: <MdHome /> },
      { name: "shorts", icon: <SiYoutubeshorts /> },
      { name: "subscriptions", icon: <BsCollectionPlay /> },
    ],
  },

  {
    title: "",
    list: [
      { name: "you", icon: <PiMonitorPlayFill /> },
      { name: "history", icon: <MdHistory /> },
    ],
  },

  {
    title: "explore",
    list: [
      { name: "trending", icon: <LiaFireAltSolid /> },
      { name: "music", icon: <PiMusicNoteBold /> },
      { name: "moviesTv", icon: <BiMoviePlay /> },
      { name: "live", icon: <CgMediaLive /> },
      { name: "gaming", icon: <SiYoutubegaming /> },
      { name: "news", icon: <RiNewspaperLine /> },
      { name: "sport", icon: <GiTrophyCup /> },
    ],
  },

  {
    title: "",
    list: [{ name: "browseChannels", icon: <IoMdAddCircleOutline /> }],
  },

  {
    title: "moreFromYoutube",
    list: [
      { name: "youtubeMusic", icon: <SiYoutubemusic color="red" /> },
      { name: "youtubeKids", icon: <TbBrandYoutubeKids color="red" /> },
    ],
  },

  {
    title: "",
    list: [
      { name: "settings", icon: <PiGearBold /> },
      { name: "reportHistory", icon: <CgFlag /> },
      { name: "help", icon: <IoMdHelpCircleOutline /> },
      { name: "sendFeedback", icon: <MdOutlineFeedback /> },
    ],
  },
];
