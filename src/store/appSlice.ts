import { createSlice } from "@reduxjs/toolkit";

interface IAppState {
  theme: "light" | "dark";
  language: "english" | "russian";
}

const initialState: IAppState = {
  theme: "dark",
  language: "english",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    switchThemeColor(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    switchTranslation(state) {
      state.language = state.language === "english" ? "russian" : "english";
    },
  },
});

export const { switchThemeColor, switchTranslation } = appSlice.actions;
