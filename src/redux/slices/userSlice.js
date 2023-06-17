import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../../DATABASE/_DATA";
import { formatUserInfo } from "../../helpers";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    userList: [],
    currentUser: {},
  },
  reducers: {
    getUserDetail: (state, action) => {
      let userId = localStorage.getItem("userId");
      if (userId) {
        state.currentUser = state.userList.find((el) => el.id === userId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = "idle";
        state.userList = action.payload;
      });
  },
});

// Async Function
export const fetchUserList = createAsyncThunk("user/getUserList", async () => {
  const response = await _getUsers();
  return formatUserInfo(response);
});

// Action creators are generated for each case reducer function
export const { getUserDetail } = userSlice.actions;

// Setup selectors for using in other files
const selectUserList = (state) => state.user.userList;
const selectUserStatus = (state) => state.user.status;
const selectCurrentUser = (state) => state.user.currentUser;
export { selectUserList, selectUserStatus, selectCurrentUser };

export default userSlice.reducer;
