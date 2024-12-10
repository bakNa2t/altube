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
    swapTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { swapTheme } = appSlice.actions;
