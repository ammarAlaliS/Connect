import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const initialState = {
  global_user: null,
  driver_information: null,
  quickcar_info: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.global_user = action.payload.global_user;
      state.driver_information = action.payload.driver_information;
    },
    clearUser: (state) => {
      state.global_user = null;
      state.driver_information = null;
    },
    setQuickCarUser: (state, action) => {
      state.quickcar_info = action.payload;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
