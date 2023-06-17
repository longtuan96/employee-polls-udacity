import React from "react";
import { Button, Card, Col } from "antd";
import moment from "moment";
import { useNavigate } from "react-router";

const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  const handleClick = (questionId) => {
    navigate(`/questions/${questionId}`);
  };
  return (
    <Col span={6} key={question.id}>
      <Card
        title={
          <div>
            {question.author}
            <p>{moment(question.timestamp).format("DD-MM-YYYY|HH:MM:SS")}</p>
          </div>
        }
      >
        <Button onClick={() => handleClick(question.id)}>show</Button>
      </Card>
    </Col>
  );
};

export default QuestionCard;
