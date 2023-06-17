import React, { useEffect, useState } from "react";
import "./PollPage.css";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthedUserId } from "../../redux/slices/authSlice";
import {
  fetchQuestionList,
  saveAnswer,
  selectQuestionList,
} from "../../redux/slices/questionSlice";
import { selectUserList } from "../../redux/slices/userSlice";
import { Button, Space } from "antd";

const PollPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentQuestionId = useParams().question_id;
  const authedUserId = useSelector(selectAuthedUserId);
  const questionListRedux = useSelector(selectQuestionList);
  const userListRedux = useSelector(selectUserList);
  const [currentQuestionDetail, setCurrentQuestionDetail] = useState(undefined);
  const [currentAuthorDetail, setCurrentAuthorDetail] = useState(undefined);
  const [hasVotedForOptionOne, setHasVotedForOptionOne] = useState(false);

  const [hasVotedForOptionTwo, setHasVotedForOptionTwo] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (questionListRedux.length > 0 && userListRedux.length > 0) {
      const resultQuestion = questionListRedux.find(
        (el) => el.id === currentQuestionId
      );
      setCurrentQuestionDetail(resultQuestion);
      let resultAuthor;
      if (resultQuestion) {
        resultAuthor = userListRedux.find(
          (el) => el.id === resultQuestion.author
        );
        setCurrentAuthorDetail(resultAuthor);
        const varHasVotedForOptionOne =
          resultQuestion.optionOne.votes.includes(authedUserId);
        setHasVotedForOptionOne(varHasVotedForOptionOne);
        const varHasVotedForOptionTwo =
          resultQuestion.optionTwo.votes.includes(authedUserId);
        setHasVotedForOptionTwo(varHasVotedForOptionTwo);
        const varHasVoted = varHasVotedForOptionOne || varHasVotedForOptionTwo;
        setHasVoted(varHasVoted);
      }
      if (!authedUserId || !resultQuestion || !resultAuthor) {
        navigate("/404");
      }
    }
    // eslint-disable-next-line
  }, [authedUserId, questionListRedux, userListRedux]);

  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(
      saveAnswer({
        authedUser: authedUserId,
        qid: currentQuestionDetail.id,
        answer: "optionOne",
      })
    );
    dispatch(fetchQuestionList());
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    dispatch(
      saveAnswer({
        authedUser: authedUserId,
        qid: currentQuestionDetail.id,
        answer: "optionTwo",
      })
    );
    dispatch(fetchQuestionList());
  };

  const calcPercentage = (option, question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    switch (option) {
      case "optionOne":
        return (
          (question.optionOne.votes.length / numberVotesTotal) * 100 + " %"
        );
      case "optionTwo":
        return (
          (question.optionTwo.votes.length / numberVotesTotal) * 100 + " %"
        );
      default:
        return "";
    }
  };

  return (
    <div className="poll-page-container">
      {!!currentAuthorDetail && !!currentQuestionDetail ? (
        <>
          <h1 className="">Poll by {currentAuthorDetail.id}</h1>

          <div className="">
            <img
              src={currentAuthorDetail.avatarURL}
              alt="Profile"
              className=""
            />
          </div>

          <div className="">
            <h2 className="">Would you rather?</h2>
          </div>

          <div className="">
            <Space>
              <Button
                disabled={hasVoted}
                onClick={handleOptionOne}
                className={
                  hasVotedForOptionOne
                    ? "custom-btn btn-highlight"
                    : "custom-btn"
                }
              >
                <div>
                  {currentQuestionDetail.optionOne.text}
                  {hasVoted && (
                    <div>
                      Votes: {currentQuestionDetail.optionOne.votes.length} (
                      {calcPercentage("optionTwo", currentQuestionDetail)})
                    </div>
                  )}
                </div>
              </Button>

              <Button
                disabled={hasVoted}
                onClick={handleOptionTwo}
                className={
                  hasVotedForOptionTwo
                    ? "custom-btn btn-highlight"
                    : "custom-btn"
                }
              >
                <div>
                  {currentQuestionDetail.optionTwo.text}
                  {hasVoted && (
                    <div>
                      Votes: {currentQuestionDetail.optionTwo.votes.length} (
                      {calcPercentage("optionTwo", currentQuestionDetail)})
                    </div>
                  )}
                </div>
              </Button>
            </Space>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PollPage;
