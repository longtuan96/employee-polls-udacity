import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserList } from "../../redux/slices/userSlice";
import { logout, selectAuthedUserId } from "../../redux/slices/authSlice";

const NavBar = () => {
  const currentUserId = useSelector(selectAuthedUserId);
  const userListRedux = useSelector(selectUserList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    if (!!currentUserId && userListRedux.length > 0) {
      const userDetail = userListRedux.find((el) => el.id === currentUserId);
      setCurrentUserName(userDetail.name);
    }
  }, [userListRedux, currentUserId]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="nav-bar">
      <Link to="/">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/new">New Poll</Link>
      <span data-testid="user-information">{currentUserName}</span>
      <button onClick={() => handleLogout()}>Logout</button>
    </nav>
  );
};

export default NavBar;
