// store.js

import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice";
import userReducer from "./userSlice";
import scrollYReducer from "./scrollYslice";
import marketSlice from "./marketSlice";
import menuReducer from './menuSlice';
import headerReducer from './headerSlice';
import blogsReducer from './blogsSlice'; 
import themeReducer from "./themeSlice";
import travelReducer from './travelSlice'

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
    scrollY: scrollYReducer,
    market: marketSlice,
    menu: menuReducer,
    header: headerReducer,
    blogs: blogsReducer,
    theme: themeReducer,
    travel: travelReducer,
  },
});

export default store;

