import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showInitialCard: true,
};

export const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    setShowInitialCard: (state, action) => {
      state.showInitialCard = action.payload;
    },
  },
});

export const { setShowInitialCard } = travelSlice.actions;
export default travelSlice.reducer;
