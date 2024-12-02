import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

const combineReducer = {
  auth: authSlice,
};

export default configureStore({
  reducer: combineReducer,
});
