// themeSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const colors = {
  light: {
    background: "#fff",
    text: "#333",
    icon: "#333",
    buttonBackground: "#1E90FF",
    buttonTextColor: "#fff",
    dotInactive: "grey",
    dotActive: "#1E90FF",
    iconNavbar: "#333",
    iconBorderBottomActive: "#333",
    borderBox : "rgba(128, 128, 128, 0.4)",
    backgroundDark : '#DDDDDD'
  },
  dark: {
    background: "#242526",
    text: "#fff",
    icon: "#f5f5f5",
    buttonBackground: "#1E90FF",
    buttonTextColor: "#fff",
    dotInactive: "grey",
    dotActive: "#1E90FF",
    iconNavbar: "#333",
    iconBorderBottomActive: "#1E90FF",
    borderBox : "rgba(128, 128, 128, 1)",
    backgroundDark : '#18191a'
  },
};

const initialState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export const selectTheme = (state) => state.theme.darkMode ? colors.dark : colors.light;

export default themeSlice.reducer;
