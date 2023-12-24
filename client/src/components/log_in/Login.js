// src/components/Login.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
import AuthContext from '../variable/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setRole } = useContext(AuthContext);


  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setRole(data.role);
        if (data.role === "manager") {
          navigate('/dashboard');
        }
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }

    // Kiểm tra thông tin đăng nhập
    // if (username === "admin" && password === "admin") {
    //   // Đăng nhập thành công, chuyển hướng sang Dashboard
    //   navigate('/dashboard');
    // } else if (username === "admin1" && password === "admin1") {
    //   // Đăng nhập thành công, chuyển hướng sang Dashboard
    //   navigate('/tellermain');
    // } else {
    //   // Đăng nhập thất bại, hiển thị thông báo lỗi
    //   setError("Invalid username or password");
    // }
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
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
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
