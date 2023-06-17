import React from "react";
import "./DashBoardPage.css";
import { Card, Col, Row } from "antd";

const DashBoardPage = () => {
  return (
    <div className="dash-board-container">
      <header>
        <h1>DASHBOARD</h1>
      </header>
      <section className="new-question-section">
        <h1>New Questions</h1>
        <Row>
          <Col>
            <Card />
          </Col>
        </Row>
      </section>
      <section className="done-section">
        <h1>Done</h1>
      </section>
    </div>
  );
};

export default DashBoardPage;
