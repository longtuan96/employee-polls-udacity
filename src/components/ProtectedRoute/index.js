import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthedUserId,
  selectIsAuthenticated,
} from "../../redux/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("userId");

  return isLoggedIn ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
