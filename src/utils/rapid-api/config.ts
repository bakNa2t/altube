interface IRapidConfigProps {
  api_key: string;
}

export const rapidConfig: IRapidConfigProps = {
  api_key: import.meta.env.VITE_RAPID_API_KEY,
};

export const HOST = "youtube-v31.p.rapidapi.com";

export const BASE_URL = "https://youtube-v31.p.rapidapi.com";
export const VIDEO_URL = `${BASE_URL}/videos?part=contentDetails%2Csnippet%2Cstatistics&id=`;
export const CHANNEL_URL = `${BASE_URL}/channels?part=snippet%2Cstatistics&id=`;
export const COMMENTS_URL = `${BASE_URL}/commentThreads?part=snippet&videoId=`;
export const CHANNELS_VIDEOS_URL = `${BASE_URL}/search?channelId=`;
export const CHANNEL_PLAYLISTS_VIDEOS_URL = `${BASE_URL}/playlistItems?playlistId=`;

export const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": rapidConfig.api_key,
    "x-rapidapi-host": HOST,
  },
};
