export const rapidConfig = {
  api_key: import.meta.env.VITE_RAPID_API_KEY,
};

export const BASE_URL = "https://youtube-v31.p.rapidapi.com";
export const HOST = "youtube-v31.p.rapidapi.com";

export const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": rapidConfig.api_key,
    "x-rapidapi-host": HOST,
  },
};
