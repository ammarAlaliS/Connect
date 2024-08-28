import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  reducers: {
    setData(state, action) {
      const { firstName, lastName, email, password } = action.payload;
      state.firstName = firstName || state.firstName;
      state.lastName = lastName || state.lastName;
      state.email = email || state.email;
      state.password = password || state.password;
    },
    setResetRegisterState(state) {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.password = "";
    },
  },
});

export const { setData, setResetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
