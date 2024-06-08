// menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuVisible: true,
  },
  reducers: {
    toggleMenuVisibility: (state) => {
      state.menuVisible = !state.menuVisible;
    },
  },
});

export const { toggleMenuVisibility } = menuSlice.actions;

export default menuSlice.reducer;
