// themeSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const colors = {
  light: {
    background: "#fff",
    text: "#333",
    textOpacity:  'rgba(128, 128, 128, 1)',
    icon: "#333",
    buttonBackground: "#FFCD57",
    buttonTextColor: "#fff",
    dotInactive: "grey",
    dotActive: "#FFCD57",
    iconNavbar: "#333",
    iconBorderBottomActive: "#333",
    borderBox: "rgba(128, 128, 128, 0.4)",
    borderBoxCardList: "1E90FF",
    backgroundDark: "#F0F2F4",
    backgroundList: "#4ade80",
    backgroundCardList: '#000',
    colorTextCardList: '#67ED94',
    backgroundBlodCard: '#fff',
    showText: '#1E90FF',
    backgroundCommentButton :  '#1E90FF',
    headerIconColor: '#06BCEE',
    headerBorderIcon: '#fff ',
    textColorLikeButton: '#ff226e',
    textCommentButton: '#1E90FF',
    backgroundComment : '#0c181c',
    // SingIn

    signInTextColor: '#06BCEE',
    singInBgColor: '#fff',
    singInInputBgColor: "rgba(173, 216, 230, 0.09)",
    singInButtonTextColor: '#fff',
    singInBorderColor:'rgba(128, 128, 128, 0.5)',
    singInRegisterTextColor: '#008000',
    singInForgotPtextColor: '#EB4166',
    singInEmailIconColor : 'rgba(128, 128, 128, 0.9)',
    singInPasswordIconColor : '#EB4166',

      // ContenMesagge 

      contentMessageBg : '#19191a',
      contentMessageBgTwo : '#8d9f58',
      contentMessageBorderColor: 'rgba(128, 128, 128, 0.4)',
      contentReceiverText: '#fff',
      contentSenderText: '#fff',
      screenBg: '#F0F2F4',
    
    // Presentation
    PreBgColor: '#fff',

    // buttonScrollToBottom 
    buttonScrollToBottomColor: '#fff',

    
    // buttonFollow

    buttonNext: '#18181b',

    // 

    textWhite: '#f3f5f8',
    textGray: '#e9edf1',
    textGrayTwo: '#78909c'


    
  },
  dark: {
    background: "#0C0C0C",
    text: "#fff",
    textOpacity:  'rgba(128, 128, 128, 0.9)',
    icon: "#f5f5f5",
    buttonBackground: "#1E90FF",
    buttonTextColor: "#fff",
    dotInactive: "grey",
    dotActive: "#1E90FF",
    iconNavbar: "#333",
    iconBorderBottomActive: "#1E90FF",
    borderBox: "rgba(128, 128, 128, 0.9)",
    borderBoxCardList: "rgba(128, 128, 128, 1)",
    backgroundDark: "#000",
    backgroundList: "#1a5319",
    backgroundBlodCard: '#555555',
    backgroundCardList: 'rgba(128, 128, 128, 0.4)',
    colorTextCardList: '#06BCEE',
    backgroundCommentButton :  'rgba(128, 128, 128, 0.4)',
    showText: '#FFCD57',
    headerIconColor: '#06BCEE',
    headerBorderIcon: '#0D1117',
    textColorLikeButton: '#ff226e',
    textCommentButton: '#1E90FF',
    backgroundComment : '#0c181c',
    // SingIn
    signInTextColor: '#06BCEE',
    singInBgColor: '#000',
    singInInputBgColor: "#000",
    singInButtonTextColor: '#fff',
    singInBorderColor:'rgba(128, 128, 128, 0.5)',
    singInRegisterTextColor: '#06BCEE',
    singInForgotPtextColor: '#EB4166',
    singInEmailIconColor : 'rgba(128, 128, 128, 0.8)',
    singInPasswordIconColor : '#EB4166',

    // ContenMesagge 

    contentMessageBg : "#0D1117",
    contentMessageBgTwo : '#19191a',
    contentMessageBorderColor: 'rgba(128, 128, 128, 0.1)',
    contentReceiverText: '#fff',
    contentSenderText: '#fff',
    screenBg: '#000',

    // Presentation
    PreBgColor: '#000',
    
    
    // buttonScrollToBottom 
    buttonScrollToBottomColor: '#000',

    // buttonFollow

    buttonNext: '#007AFF',

    
    textWhite: '#d0d7df',
    textGray: '#ebeff2',
    yellow: '#f3bc3d'

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
