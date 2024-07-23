import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showInitialCard: true,
  isOriginAutoCompleteFocused: false,
  placesSelected: false,
  quickCarsData: [],
  tripOrigin: { latitude: 0, longitude: 0 },
  tripOriginName: "",
  tripDestination: { latitude: 0, longitude: 0 },
  tripDestinationName: "",
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
      state.placesSelected = action.payload;
    },
    setQuickarData: (state, action) => {
      state.quickCarsData = action.payload;
    },
    setTripOrigin: (state, action) => {
      state.tripOrigin = action.payload;
    },
    setTripOriginName: (state, action) => {
      state.tripOriginName = action.payload;
    },
    setTripDestination: (state, action) => {
      state.tripDestination = action.payload;
    },
    setTripDestinationName: (state, action) => {
      state.tripDestinationName = action.payload;
    },
  },
});

export const {
  setShowInitialCard,
  setIsOriginAutoCompleteFocused,
  setPlacesSelected,
  setQuickarData,
  setTripOrigin,
  setTripOriginName,
  setTripDestination,
  setTripDestinationName,
} = travelSlice.actions;
export default travelSlice.reducer;
