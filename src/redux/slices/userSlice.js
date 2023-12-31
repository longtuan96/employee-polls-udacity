import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../../DATABASE/_DATA";
import { formatUserInfo } from "../../helpers";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    userList: [],
    userListSorted: [],
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
        state.userListSorted = action.payload.sort(
          (a, b) =>
            Object.keys(b.answers).length - Object.keys(a.answers).length
        );
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
const selectUserListSorted = (state) => state.user.userListSorted;
const selectUserStatus = (state) => state.user.status;
const selectCurrentUser = (state) => state.user.currentUser;
export {
  selectUserList,
  selectUserStatus,
  selectCurrentUser,
  selectUserListSorted,
};

export default userSlice.reducer;
