import { createSlice } from "@reduxjs/toolkit";

const tripSlice = createSlice({
  name: "trip",
  initialState: {
    startLocation: {
      latitude: null,
      longitude: null,
      name: "",
    },
    endLocation: {
      latitude: null,
      longitude: null,
      name: "",
    },
    startTime: {
      hour: 0,
      minutes: 0,
    },
    numberOfSeatRequested: 1,
    seatRequested: 0,
  },

  reducers: {
    setStartLocation: (state, action) => {
      state.startLocation = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        name: action.payload.name || state.startLocation.name,
      };
    },
    setEndLocation: (state, action) => {
      state.endLocation = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        name: action.payload.name || state.endLocation.name,
      };
    },
    setStartTime: (state, action) => {
      state.startTime = {
        hour: action.payload.hour,
        minutes: action.payload.minutes,
      };
    },
    setNumberOfSeatRequested: (state, action) => {
      state.numberOfSeatRequested = action.payload;
    },
    resetTrip: (state) => {
      state.startLocation = {
        latitude: null,
        longitude: null,
        name: "",
      };
      state.endLocation = {
        latitude: null,
        longitude: null,
        name: "",
      };
      state.startTime = {
        hour: 0,
        minutes: 0,
      };
      state.numberOfSeatRequested = 1;
    },
    startLocationReset: (state) => {
      state.startLocation = {
        latitude: null,
        longitude: null,
        name: "",
      };
    },
    endLocationReset: (state) => {
        state.endLocation = {
          latitude: null,
          longitude: null,
          name: "",
        };
      },
  },
});

export const {
  setStartLocation,
  setEndLocation,
  setStartTime,
  setNumberOfSeatRequested,
  resetTrip,
  startLocationReset,
  endLocationReset
} = tripSlice.actions;

export default tripSlice.reducer;
