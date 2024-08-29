import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    description: "", 
    role: ""
  },
  reducers: {
    setData(state, action) {
      const { firstName, lastName, email, password } = action.payload;
      state.firstName = firstName || state.firstName;
      state.lastName = lastName || state.lastName;
      state.email = email || state.email;
      state.password = password || state.password;
    },

    setDescriptionAndRoleAccount(state, action) {
      const { description, role } = action.payload;
      state.description = description;
      state.role = role;
    },

    setResetRegisterState(state) {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.password = "";
      state.description = "";
      state.role = "";
    },
  },
});

export const { setData, setDescriptionAndRoleAccount, setResetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;

