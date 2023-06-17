import React, { useState } from "react";
import "./NewPollPage.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthedUserId } from "../../redux/slices/authSlice";
import {
  fetchQuestionList,
  saveQuestion,
} from "../../redux/slices/questionSlice";

const NewPollPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authedUserId = useSelector(selectAuthedUserId);
  const [firstOptionInput, setFirstOptionInput] = useState("");
  const [secondOptionInput, setSecondOptionInput] = useState("");

  const handleFirstOptionInputChange = (e) => {
    const value = e.target.value;
    setFirstOptionInput(value);
  };

  const handleSecondOptionInputChange = (e) => {
    const value = e.target.value;
    setSecondOptionInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      optionOneText: firstOptionInput,
      optionTwoText: secondOptionInput,
      author: authedUserId,
    };
    dispatch(saveQuestion(payload));
    dispatch(fetchQuestionList());
    navigate("/");
  };
  return (
    <div>
      <h1 className="">Would You Rather</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label
            htmlFor="firstOption"
            data-testid="firstOptionLabel"
            className=""
          >
            First Option
          </label>
          <div className="">
            <input
              value={firstOptionInput}
              onChange={handleFirstOptionInputChange}
              type="text"
              name="firstOption"
              id="firstOption"
              data-testid="firstOption"
              className=""
            />
          </div>
        </div>

        <div className="">
          <label
            htmlFor="secondOption"
            data-testid="secondOptionLabel"
            className=""
          >
            Second Option
          </label>
          <div className="">
            <input
              value={secondOptionInput}
              onChange={handleSecondOptionInputChange}
              type="text"
              name="secondOption"
              id="secondOption"
              data-testid="secondOption"
              className=""
            />
          </div>
        </div>

        <div className="">
          <button type="submit" className="">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPollPage;
