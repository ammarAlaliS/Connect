import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice";
import userReducer from "./userSlice";
import scrollYReducer from "./scrollYslice";
import marketSlice from "./marketSlice";
import menuReducer from './menuSlice';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
    scrollY: scrollYReducer,
    market: marketSlice,
    menu: menuReducer,
  },
});
