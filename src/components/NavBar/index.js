import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserList } from "../../redux/slices/userSlice";
import { logout, selectAuthedUserId } from "../../redux/slices/authSlice";

const NavBar = () => {
  const [currentUserDetail, setCurrentUserDetail] = useState({});
  const currentUserId = useSelector(selectAuthedUserId);
  const userListRedux = useSelector(selectUserList);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!!currentUserId) {
      const userDetail = userListRedux.find((el) => el.id === currentUserId);
      setCurrentUserDetail(userDetail);
    }
  }, [currentUserId]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="nav-bar">
      <Link to="/">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/new">New Poll</Link>
      <span data-testid="user-information">{currentUserDetail.name}</span>
      <button onClick={() => handleLogout()}>Logout</button>
    </nav>
  );
};

export default NavBar;
