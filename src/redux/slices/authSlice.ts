import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  isUserAuthenticated: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isAdminAuthenticated: false,
  isUserAuthenticated: false,
};

const authSlice = createSlice({
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
    logout(state) {
      state.isAuthenticated = false;
      state.isAdminAuthenticated = false;
      state.isUserAuthenticated = false;
    },
  },
});

export const { loginAdmin, loginUser, logout } = authSlice.actions;
export default authSlice.reducer;
