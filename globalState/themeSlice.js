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
    backgroundDark: "#e4e4e6",
    backgroundList: "#4ade80",
    backgroundCardList: '#000',
    colorTextCardList: '#67ED94',
    backgroundBlodCard: '#fff',
    showText: '#1E90FF',
    backgroundCommentButton :  '#1E90FF',
    headerIconColor: '#1A5319',
    headerBorderIcon: '#67ED94 ',
    textColorLikeButton: '#ff226e',
    textCommentButton: '#1E90FF',
    backgroundComment : '#000',
    // SingIn
    signInTextColor: '#06BCEE',
    singInBgColor: '#fff',
    singInInputBgColor: "rgba(173, 216, 230, 0.09)",
    singInButtonTextColor: '#fff',
    singInBorderColor: '#ccc',
    singInRegisterTextColor: '#008000',
    singInForgotPtextColor: '#EB4166',
    singInEmailIconColor : '#008000',
    singInPasswordIconColor : '#EB4166',
    
    // Presentation
    PreBgColor: '#fff'
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
    borderBox: "rgba(128, 128, 128, 0.3)",
    borderBoxCardList: "rgba(128, 128, 128, 1)",
    backgroundDark: "#000",
    backgroundList: "#1a5319",
    backgroundBlodCard: '#555555',
    backgroundCardList: 'rgba(128, 128, 128, 0.4)',
    colorTextCardList: '#06BCEE',
    backgroundCommentButton :  'rgba(128, 128, 128, 0.4)',
    showText: '#FFCD57',
    headerIconColor: '#06BCEE',
    headerBorderIcon: '#06BCEE',
    textColorLikeButton: '#ff226e',
    textCommentButton: '#1E90FF',
    backgroundComment : '#000',
    // SingIn
    signInTextColor: '#06BCEE',
    singInBgColor: '#000',
    singInInputBgColor: "#000",
    singInButtonTextColor: '#fff',
    singInBorderColor: '#ccc',
    singInRegisterTextColor: '#06BCEE',
    singInForgotPtextColor: '#EB4166',
    singInEmailIconColor : '#06BCEE',
    singInPasswordIconColor : '#EB4166',

    // Presentation
    PreBgColor: '#000'
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
export const selectDarkMode = (state) => state.theme.darkMode;
export const selectTheme  = (state) =>
  state.theme.darkMode ? colors.dark : colors.light;

export default themeSlice.reducer;
