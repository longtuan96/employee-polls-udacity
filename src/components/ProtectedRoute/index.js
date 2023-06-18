import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectAuthedUserId } from "../../redux/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const authedUserId = useSelector(selectAuthedUserId);
  return !!authedUserId ? (
    children
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default ProtectedRoute;
