import React, { useState } from "react";
import "./NewPollPage.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthedUserId } from "../../redux/slices/authSlice";
import {
  fetchQuestionList,
  saveQuestion,
} from "../../redux/slices/questionSlice";
import { fetchUserList } from "../../redux/slices/userSlice";

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
    dispatch(fetchUserList());
    navigate("/");
  };
  return (
    <div className="new-poll-page-container">
      <h1 className="">Would You Rather</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="firstOption" className="">
            First Option
          </label>
          <div className="">
            <input
              value={firstOptionInput}
              onChange={handleFirstOptionInputChange}
              type="text"
              name="firstOption"
              id="firstOption"
              data-testid="firstOptionInput"
              className=""
            />
          </div>
        </div>

        <div className="">
          <label htmlFor="secondOption" className="">
            Second Option
          </label>
          <div className="">
            <input
              value={secondOptionInput}
              onChange={handleSecondOptionInputChange}
              type="text"
              name="secondOption"
              id="secondOption"
              data-testid="secondOptionInput"
              className=""
            />
          </div>
        </div>

        <div className="">
          <button type="submit" className="" data-testid="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPollPage;
