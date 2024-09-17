import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Initially set to false
  isAuthenticated: false,
  isAdminAuthenticated: false,
  isUserAuthenticated: false,
};

const authSlice = createSlice({
  // Name of slice.
  name: "auth",
  initialState,
  reducers: {
    loginAdmin(state) {
      state.isAuthenticated = true;
      state.isAdminAuthenticated = true;
    },

    loginUser(state) {
      state.isAuthenticated = true;
      state.isUserAuthenticated = true;
    },
    
    // Reset to false on logout
    logout(state) {
      state.isAuthenticated = false;
      state.isAdminAuthenticated = false;
      state.isUserAuthenticated = false;
    },
  },
});

export const { loginAdmin, loginUser, logout } = authSlice.actions;

export default authSlice.reducer;
