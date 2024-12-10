import { createSlice } from "@reduxjs/toolkit";

interface IAppState {
  theme: "light" | "dark";
}

const initialState: IAppState = {
  theme: "dark",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = appSlice.actions;
