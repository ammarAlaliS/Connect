import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showInitialCard: true,
  isOriginAutoCompleteFocused: false,
  placesSelected: false,
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
    setPlacesSelected: (state, action) => {
      console.log("Se esta intentando cambiar la mierda" + action.payload);
      state.placesSelected = action.payload;
    },
  },
});

export const {
  setShowInitialCard,
  setIsOriginAutoCompleteFocused,
  setPlacesSelected,
} = travelSlice.actions;
export default travelSlice.reducer;
