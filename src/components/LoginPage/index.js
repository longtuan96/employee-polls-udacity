import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, selectUserList } from "../../redux/slices/userSlice";
import { formatUserInfoToOptions } from "../../helpers";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userListRedux = useSelector(selectUserList);
  const [options, setOptions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(undefined);

  useEffect(() => {
    setOptions(formatUserInfoToOptions(userListRedux));
  }, [userListRedux]);

  const handleLogin = () => {
    dispatch(login(selectedUserId));
    dispatch(getUserDetail());
    navigate("/");
  };
  const handleSelect = (userid) => {
    setSelectedUserId(userid);
  };
  return (
    <div className="login-page-container">
      <h1 data-testid="login-header">Login</h1>
      <p>Please select a person</p>
      <Select
        style={{ width: 120 }}
        options={options}
        onSelect={handleSelect}
      />

      <Button
        style={{ marginTop: "10px" }}
        type="primary"
        onClick={() => handleLogin()}
      >
        Submit
      </Button>
    </div>
  );
};

export default LoginPage;
