import React from "react";
import "./DashBoardPage.css";

const DashBoardPage = () => {
  return (
    <div className="dash-board-container">
      <header style={{ textTransform: "uppercase" }}>Dashboard</header>
      <section className="new-question-section"></section>
      <section className="done-section"></section>
    </div>
  );
};

export default DashBoardPage;
