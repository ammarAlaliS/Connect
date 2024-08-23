import { createSlice } from '@reduxjs/toolkit';


const tripSlice = createSlice({
  name: 'trip',
  initialState: {
    startLocation: {
      latitude: null,
      longitude: null,
      name: 'Managua Nicaragua colonia',
    },
    endLocation: {
      latitude: null,
      longitude: null,
      name: '',
    },
    startTime: {
      hour: 0,
      minutes: 0,
    },
    numberOfSeatRequested: 1,
    seatRequested: 0,
  },

  reducers: {
    setStarLocation: (state, action) => {
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
        name: null,
      };
      state.endLocation = {
        latitude: null,
        longitude: null,
        name: null,
      };
      state.startTime = {
        hour: 0,
        minutes: 0,
      };
      state.numberOfSeatRequested = 1;
    },
  },
});

export const {
  setStarLocation,
  setEndLocation,
  setStartTime,
  setNumberOfSeatRequested,
  resetTrip,
} = tripSlice.actions;

export default tripSlice.reducer;
