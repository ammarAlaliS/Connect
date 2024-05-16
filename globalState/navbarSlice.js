import { createSlice } from "@reduxjs/toolkit";


const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    visible: false,
  },
  reducers: {
    toggleNavbar: state => {
      state.visible = !state.visible;
    },
  },
});

export const { toggleNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
