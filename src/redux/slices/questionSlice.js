import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../../DATABASE/_DATA";
import { formatQuestionInfo } from "../../helpers";

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
      })
      .addCase(fetchQuestionList.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(saveQuestion.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(saveQuestion.rejected, (state, action) => {
        state.status = "idle";
        console.log("Error in Save Question");
      })
      .addCase(saveAnswer.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(saveAnswer.rejected, (state, action) => {
        state.status = "idle";
        console.log("Error in Save Answer");
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

export const saveQuestion = createAsyncThunk(
  "question/saveQuestion",
  async (payload) => {
    const response = await _saveQuestion(payload);
    return response;
  }
);

export const saveAnswer = createAsyncThunk(
  "question/saveAnswer",
  async (payload) => {
    const response = await _saveQuestionAnswer(payload);
    return response;
  }
);
// Action creators are generated for each case reducer function
// export const {} = questionSlice.actions;

// Setup selectors for using in other files
const selectQuestionList = (state) => state.question.list;
const selectQuestionStatus = (state) => state.question.status;

export { selectQuestionList, selectQuestionStatus };

export default questionSlice.reducer;
