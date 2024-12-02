import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../actions/authAcion";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    loginUserData: null,
    error: null,
    success: false,
    isLoggedIn: false,
    isAgentOnline: true,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    // admin login
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.loginUserData = payload.data;
      state.isLoggedIn = true;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
