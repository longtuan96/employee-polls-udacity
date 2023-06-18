import React, { useEffect, useState } from "react";
import "./DashBoardPage.css";
import { useSelector } from "react-redux";
import { selectQuestionList } from "../../redux/slices/questionSlice";
import { selectUserList } from "../../redux/slices/userSlice";
import { selectAuthedUserId } from "../../redux/slices/authSlice";
import QuestionCard from "../QuestionCard";
import { Checkbox, Row } from "antd";

const DashBoardPage = () => {
  const questionListRedux = useSelector(selectQuestionList);
  const [questions, setQuestions] = useState([]);
  const userListRedux = useSelector(selectUserList);
  const authedUserId = useSelector(selectAuthedUserId);
  const [showAnswered, setShowAnswered] = useState(false);
  useEffect(() => {
    if (questionListRedux.length > 0) setQuestions(questionListRedux);
  }, [userListRedux, questionListRedux, authedUserId]);

  const isUnanswered = (question) =>
    !question.optionOne.votes.includes(authedUserId) &&
    !question.optionTwo.votes.includes(authedUserId);
  const isAnswered = (question) =>
    question.optionOne.votes.includes(authedUserId) ||
    question.optionTwo.votes.includes(authedUserId);
  const handleCheckBox = (e) => {
    setShowAnswered(e.target.checked);
  };
  return (
    <div className="dash-board-container">
      <header>
        <h1>DASHBOARD</h1>
      </header>
      <Checkbox onChange={handleCheckBox}>Show Answered Polls?</Checkbox>
      {showAnswered ? (
        <section className="answered-section">
          <h1>Answered Questions</h1>
          <Row gutter={16}>
            {questions.length > 0 &&
              questions
                .filter(isAnswered)
                .map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
          </Row>
        </section>
      ) : (
        <section className="unanswered-section">
          <h1>Unanswered Questions</h1>
          <Row>
            {questions.length > 0 &&
              questions
                .filter(isUnanswered)
                .map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
          </Row>
        </section>
      )}
    </div>
  );
};

export default DashBoardPage;
