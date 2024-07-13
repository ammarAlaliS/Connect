import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showInitialCard: true,
  isOriginAutoCompleteFocused: false,
};

export const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    setShowInitialCard: (state, action) => {
      state.showInitialCard = action.payload;
    },
    setIsOriginAutoCompleteFocused: (state, action) => {
      state.isOriginAutoCompleteFocused = action.payload;
    },
  },
});

export const { setShowInitialCard, setIsOriginAutoCompleteFocused } =
  travelSlice.actions;
export default travelSlice.reducer;
