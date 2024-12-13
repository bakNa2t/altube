interface IRapidConfigProps {
  api_key: string;
}

export const rapidConfig: IRapidConfigProps = {
  api_key: import.meta.env.VITE_RAPID_API_KEY,
};

export const BASE_URL = "https://youtube-v31.p.rapidapi.com";
export const VIDEO_URL = `${BASE_URL}/videos?part=contentDetails%2Csnippet%2Cstatistics&id=`;
export const COMMENTS_URL = `${BASE_URL}/commentThreads?part=snippet&videoId=`;
export const HOST = "youtube-v31.p.rapidapi.com";

export const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": rapidConfig.api_key,
    "x-rapidapi-host": HOST,
  },
};
