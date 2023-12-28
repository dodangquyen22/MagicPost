// src/components/Login.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
import AuthContext from '../variable/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setRole, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (event) => {
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
      console.log(data);
      // const uid = data.uid;
      // Cookies.set('uid', uid, { expires: 1, path: '/' });
      // console.log(Cookies.get('uid'));
      localStorage.setItem('token', data.token);
      localStorage.setItem('pointID', data.pointID);
      // const uidCookie = response.headers.get('set-cookie');
      // console.log(uidCookie);
      // console.log(data)
      if (response.ok) {
        setRole(data.role);
        setUser(username);
        console.log(data);
        // const uid = data.uid;
        if (data.role === "manager") {
          navigate('/dashboard');
        } else if (data.role === "warehouse leader") {
          navigate('/warehouse');
        } else if (data.role === "transaction leader") {
          navigate('/transactionpoint');
        } else if (data.role === "point staff") {
          navigate('/tellermain');
        } else if (data.role === "warehouse staff") {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label
            className="toggle-password-btn"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </label>
        </div>
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
        <button type="submit" className="btn btn-primary">Đăng Nhập</button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
}

export default Login;
