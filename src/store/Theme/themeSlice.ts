import { createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setLight(state) {
      state.mode = "light";
    },
    setDark(state) {
      state.mode = "dark";
    },
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setLight, setDark, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
