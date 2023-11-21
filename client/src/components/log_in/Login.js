// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = credentials;

    // Kiểm tra thông tin đăng nhập
    if (username === "admin" && password === "admin") {
      // Đăng nhập thành công, chuyển hướng sang Dashboard
      navigate('/dashboard');
    } else if (username === "admin1" && password === "admin1") {
      // Đăng nhập thành công, chuyển hướng sang Dashboard
      navigate('/tellermain');
    } else if (username === "user" && password === "user") {
      // Đăng nhập thành công, chuyển hướng sang Dashboard
      navigate('/user');
    } else {
      // Đăng nhập thất bại, hiển thị thông báo lỗi
      setError("Invalid username or password");
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Sign In</h3>

      <div className="mb-3">
        <label>Username</label>
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder="Enter username"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handleInputChange}
        />
      </div>

      <div>
        <select className="form-control role" defaultValue="Lãnh đạo công ty">
          <option value="Lãnh đạo công ty">Lãnh đạo công ty</option>
          <option value="1">Trưởng điểm tại điểm giao dịch</option>
          <option value="2">Giao dịch viên</option>
          <option value="3">Trưởng điểm tại điểm tập kết</option>
          <option value="4">Nhân viên tại điểm tập kết</option>
          <option value="5">Khách hàng</option>
        </select>
      </div>

      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
}

export default Login;
