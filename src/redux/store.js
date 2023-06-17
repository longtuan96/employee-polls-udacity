import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
