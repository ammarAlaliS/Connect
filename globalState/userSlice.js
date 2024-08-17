import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const initialState = {
  global_user: null,
  
  driver_information: null,
  quickcar_info: {
    CurrentQuickCarLocation: { latitude: 40.473687, longitude: -3.709342 },
    PricePerKilometer: 20,
    TripFare: 20,
    _id: "66b6dc59d5ad94ecca60dbb4",
    availableSeats: 4,
    driverIsActiveState: true,
    drivingLicense: "licencia123",
    drivingLicenseImage: null,
    endLocation: {
      endLocationName: "Trabajo",
      latitude: 40.45142,
      longitude: -3.715488,
    },
    endTime: { hour: 0, minute: 0 },
    pricePerSeat: 20,
    regularDays: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    starLocation: {
      latitude: 40.473687,
      longitude: -3.709342,
      startLocationName: "Casa",
    },
    startTime: { hour: 0, minute: 0 },
    user: "6696af34a97fbe4ebe74e350",
    vehicleModel: "Lamborgini",
    vehicleModelImage: null,
    vehicleType: "Coche",
  },
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
    setQuickCarInfo: (state, action) => {
      state.quickcar_info = action.payload;
    },
  },
});

export const { setUser, clearUser, setQuickCarInfo } = userSlice.actions;
export default userSlice.reducer;
