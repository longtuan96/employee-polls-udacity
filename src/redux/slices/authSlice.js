import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../../DATABASE/_DATA";
import { formatUserInfo } from "../../helpers";
import { useNavigate } from "react-router-dom";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    authedUserId: undefined,

    isAuthenticated: false,
  },
  reducers: {
    checkAuth: (state, action) => {
      if (localStorage.getItem("userId")) {
        state.isAuthenticated = true;
      }
    },
    login: (state, action) => {
      localStorage.setItem("userId", action.payload);
      state.authedUserId = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.clear();
      state.authedUserId = undefined;
      state.isAuthenticated = false;
    },
  },
});

// Async Function
// export const fetchUserList = createAsyncThunk("auth/test", async () => {
//   const response = await _getUsers();
//   return formatUserInfo(response);
// });

// Action creators are generated for each case reducer function
export const { checkAuth, login, logout } = authSlice.actions;

// Setup selectors for using in other files
const selectAuthedUserId = (state) => state.auth.authedUserId;
const selectAuthStatus = (state) => state.auth.status;
const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export { selectAuthedUserId, selectAuthStatus, selectIsAuthenticated };

export default authSlice.reducer;
