import authAPI from "@/app/services/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

// login admin api
export const loginUser = createAsyncThunk("admin/loginUser", async (data, { rejectWithValue }) => {
  try {
    const response = await authAPI.loginApi(data);
    // console.log("data - action", response.data);
    localStorage.setItem("accessToken", response.data.token);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

// logout admin api
export const logoutUser = createAsyncThunk("admin/logoutUser", async (data, { rejectWithValue }) => {
  try {
    const response = await authAPI.logoutApi();
    localStorage.removeItem("accessToken");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

// register admin api
export const registerUser = createAsyncThunk("admin/registerUser", async (data, { rejectWithValue }) => {
  try {
    const response = await authAPI.registerApi(data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
