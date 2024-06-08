import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice";
import userReducer from "./userSlice";
import scrollYReducer from "./scrollYslice";
import marketSlice from "./marketSlice";
import menuReducer from './menuSlice';
import headerReducer from './headerSlice';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
    scrollY: scrollYReducer,
    market: marketSlice,
    menu: menuReducer,
    header: headerReducer,
  },
});
