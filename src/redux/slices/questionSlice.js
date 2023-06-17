import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getQuestions, _getUsers } from "../../DATABASE/_DATA";
import { formatQuestionInfo, formatUserInfo } from "../../helpers";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    status: "idle",
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestionList.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = formatQuestionInfo(action.payload);
        console.log("question", formatQuestionInfo(action.payload));
      });
  },
});

// Async Function
export const fetchQuestionList = createAsyncThunk(
  "question/getQuestionList",
  async () => {
    const response = await _getQuestions();
    return response;
  }
);
// Action creators are generated for each case reducer function
export const {} = questionSlice.actions;

// Setup selectors for using in other files
const selectQuestionList = (state) => state.question.list;
const selectQuestionStatus = (state) => state.question.status;
// const selectCurrentUser = (state) => state.user.currentUser;

export { selectQuestionList, selectQuestionStatus };

export default questionSlice.reducer;
