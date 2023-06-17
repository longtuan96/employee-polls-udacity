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

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserList());
    dispatch(fetchQuestionList());
    dispatch(checkAuth());
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
        {/* <Route
          path="/leaderboard"
          exact
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/questions/:id"
          element={
            <PrivateRoute>
              <PollPage />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/new"
          exact
          element={
            <PrivateRoute>
              <NewPoll />
            </PrivateRoute>
          }
        /> */}
        <Route path="/404" exact element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
