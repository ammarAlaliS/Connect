// store.js

import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice";
import userReducer from "./userSlice";
import scrollYReducer from "./scrollYslice";
import marketSlice from "./marketSlice";
<<<<<<< HEAD
import menuReducer from './menuSlice';
import headerReducer from './headerSlice';
import blogsReducer from './blogsSlice'; 
import themeReducer from "./themeSlice";
=======
import menuReducer from "./menuSlice";
import headerReducer from "./headerSlice";
import blogsReducer from "./blogsSlice";
import travelReducer from "./travelSlice";
>>>>>>> fe1bf20cebc0fae001de3e2e5020a83f42b23395

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
    scrollY: scrollYReducer,
    market: marketSlice,
    menu: menuReducer,
    header: headerReducer,
    blogs: blogsReducer,
<<<<<<< HEAD
    theme: themeReducer,
=======
    travel: travelReducer,
>>>>>>> fe1bf20cebc0fae001de3e2e5020a83f42b23395
  },
});

export default store;

