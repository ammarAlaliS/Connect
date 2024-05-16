import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from './navbarSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
  },
});
