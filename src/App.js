import React, { useEffect } from "react";

import "./App.css";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar";
import NotFoundPage from "./components/NotFoundPage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, selectIsAuthenticated } from "./redux/slices/authSlice";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { fetchUserList } from "./redux/slices/userSlice";
import DashBoardPage from "./components/DashBoardPage";
import { fetchQuestionList } from "./redux/slices/questionSlice";
import LeaderBoardPage from "./components/LeaderBoardPage";
import PollPage from "./components/PollPage";
import NewPollPage from "./components/NewPollPage";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserList());
    dispatch(fetchQuestionList());
    dispatch(checkAuth());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/login" exact element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashBoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          exact
          element={
            <ProtectedRoute>
              <LeaderBoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <ProtectedRoute>
              <PollPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          exact
          element={
            <ProtectedRoute>
              <NewPollPage />
            </ProtectedRoute>
          }
        />
        <Route path="/404" exact element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
