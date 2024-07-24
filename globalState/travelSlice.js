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
  quickCarsDistances: [],
  locationForegroundPermissions: "denied",
  userLocation: { latitude: 0, longitude: 0 },
  startTime: { hour: 0, minutes: 0 },
  seatRequested: 0,
  inputIsActive: false,
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
    setQuickCarsDistances: (state, action) => {
      state.quickCarsDistances = action.payload;
    },
    setLocationForegroundPermissions: (state, action) => {
      state.locationForegroundPermissions = action.payload;
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setSeatRequested: (state, action) => {
      state.seatRequested = action.payload;
    },
    setIsInputActive: (state, action) => {
      state.inputIsActive = action.payload;
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
  setQuickCarsDistances,
  setLocationForegroundPermissions,
  setUserLocation,
  setStartTime,
  setSeatRequested,
  setIsInputActive,
} = travelSlice.actions;
export default travelSlice.reducer;
