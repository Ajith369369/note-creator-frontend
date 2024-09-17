import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Initially set to false
  isAuthenticated: false,
};

const authSlice = createSlice({
  // Name of slice.
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },

    // Reset to false on logout
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
