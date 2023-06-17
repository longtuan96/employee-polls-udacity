import React, { useEffect, useState } from "react";
import "./DashBoardPage.css";
import { Button, Card, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectQuestionList } from "../../redux/slices/questionSlice";
import { selectUserList } from "../../redux/slices/userSlice";
import { selectAuthedUserId } from "../../redux/slices/authSlice";
import moment from "moment/moment";

const DashBoardPage = () => {
  const dispatch = useDispatch();
  const questionListRedux = useSelector(selectQuestionList);
  const [questions, setQuestions] = useState([]);
  const userListRedux = useSelector(selectUserList);
  const authedUserId = useSelector(selectAuthedUserId);
  useEffect(() => {
    console.log("test", userListRedux, questionListRedux);
    if (questionListRedux.length > 0) setQuestions(questionListRedux);
  }, [userListRedux, questionListRedux, authedUserId]);

  const renderQuestionCard = () => {
    if (userListRedux.length > 0 && questionListRedux.length > 0) {
    }
  };

  const isUnanswered = (question) =>
    !question.optionOne.votes.includes(authedUserId) &&
    !question.optionTwo.votes.includes(authedUserId);
  const isAnswered = (question) =>
    question.optionOne.votes.includes(authedUserId) ||
    question.optionTwo.votes.includes(authedUserId);

  return (
    <div className="dash-board-container">
      <header>
        <h1>DASHBOARD</h1>
      </header>
      <section className="answered-section">
        <h1>Answered Questions</h1>
        <Row gutter={16}>
          {questions.length > 0 &&
            questions.filter(isAnswered).map((question) => {
              return (
                <Col span={6} key={question.id}>
                  <Card
                    title={
                      <div>
                        {question.author}
                        <p>{moment(question.timestamp).format("DD-MM-YYYY")}</p>
                      </div>
                    }
                  >
                    <Button>show</Button>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </section>
      <section className="unanswered-section">
        <h1>Unanswered Questions</h1>
        <Row>
          {questions.length > 0 &&
            questions.filter(isUnanswered).map((question) => {
              return (
                <Col span={6} key={question.id}>
                  <Card
                    title={
                      <div>
                        {question.author}
                        <p>{moment(question.timestamp).format("DD-MM-YYYY")}</p>
                      </div>
                    }
                  >
                    <Button>show</Button>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </section>
    </div>
  );
};

export default DashBoardPage;
