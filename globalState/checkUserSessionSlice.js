// globalState/checkUserSessionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const checkUserSessionSlice = createSlice({
  name: 'sessionStatus',
  initialState: {
    isUserSessionActive: false,
    fetchLoading: true,
  },
  reducers: {
    setSession: (state, action) => {
      state.isUserSessionActive = action.payload;
    },
    setFetchLoading: (state, action) => {
      state.fetchLoading = action.payload;
    },
  },
});

export const { setSession, setFetchLoading } = checkUserSessionSlice.actions;
export default checkUserSessionSlice.reducer;
