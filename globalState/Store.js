import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from './navbarSlice';
import userReducer from './userSlice';
import scrollYReducer from './scrollYslice'


export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
    scrollY: scrollYReducer

  },
});
