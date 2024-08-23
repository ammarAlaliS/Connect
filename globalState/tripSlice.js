import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  starLocationLatitude: null,
  starLocationLongitude: null,
  endLocationLatitude: null,
  endLocationLongitude: null,
  starTimeHour: null,
  starTimeMinutes: null,
  numberOfSeatRequested: 1,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setStarLocation: (state, action) => {
      state.starLocationLatitude = action.payload.latitude;
      state.starLocationLongitude = action.payload.longitude;
    },
    setEndLocation: (state, action) => {
      state.endLocationLatitude = action.payload.latitude;
      state.endLocationLongitude = action.payload.longitude;
    },
    setStartTime: (state, action) => {
      state.starTimeHour = action.payload.hour;
      state.starTimeMinutes = action.payload.minutes;
    },
    setNumberOfSeatRequested: (state, action) => {
      state.numberOfSeatRequested = action.payload;
    },
    resetTrip: (state) => {
      state.starLocationLatitude = null;
      state.starLocationLongitude = null;
      state.endLocationLatitude = null;
      state.endLocationLongitude = null;
      state.starTimeHour = null;
      state.starTimeMinutes = null;
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
