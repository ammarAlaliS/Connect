// themeSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const colors = {
  light: {
    background: "#fff",
    text: "#333",
    icon: "#333",
    buttonBackground: "#FFCD57",
    buttonTextColor: "#fff",
    dotInactive: "grey",
    dotActive: "#FFCD57",
    iconNavbar: "#333",
    iconBorderBottomActive: "#333",
    borderBox: "rgba(128, 128, 128, 0.4)",
    borderBoxCardList: "1E90FF",
    backgroundDark: "#DDDDDD",
    backgroundList: "#4ade80",
    backgroundCardList: '#000',
    colorTextCardList: '#67ED94',
    backgroundBlodCard: '#fff',
    showText: '#1E90FF',
    backgroundCommentButton :  '#1E90FF',

    // header icon color 
    headerIconColor: '#1A5319',
    headerBorderIcon: '#67ED94 ',

    // like color 
    textColorLikeButton: '#ff226e',
    // comment button 
    textCommentButton: '#1E90FF',
    backgroundComment : '#000'
  },
  dark: {
    background: "#0D1117",
    text: "#fff",
    icon: "#f5f5f5",
    buttonBackground: "#1E90FF",
    buttonTextColor: "#fff",
    dotInactive: "grey",
    dotActive: "#1E90FF",
    iconNavbar: "#333",
    iconBorderBottomActive: "#1E90FF",
    borderBox: "rgba(128, 128, 128, 1)",
    borderBoxCardList: "rgba(128, 128, 128, 1)",
    backgroundDark: "#000",
    backgroundList: "#1a5319",
    backgroundBlodCard: '#555555',
    backgroundCardList: 'rgba(128, 128, 128, 0.4)',
    colorTextCardList: '#06BCEE',
    backgroundCommentButton :  'rgba(128, 128, 128, 0.4)',
    showText: '#FFCD57',
     // header icon color 
    headerIconColor: '#06BCEE',
    headerBorderIcon: '#06BCEE',
      // like color 
    textColorLikeButton: '#ff226e',
    // comment button 
    textCommentButton: '#1E90FF',
    backgroundComment : '#000'
  },
};

const initialState = {
  darkMode: true,
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

export const selectTheme = (state) =>
  state.theme.darkMode ? colors.dark : colors.light;

export default themeSlice.reducer;
