import { createClient } from "pexels";

export const pexelsConfig = {
  api_key: import.meta.env.VITE_PEXELS_API_KEY,
};

export const client = createClient(pexelsConfig.api_key);
