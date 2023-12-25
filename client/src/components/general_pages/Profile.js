// src/components/Profile.js

import React from 'react';
import Navbar from '../bar/Navbar';
import { Outlet, Link } from "react-router-dom";
import './Profile.css';
import Sidebar from '../bar/Sidebar';

const Profile = () => {
  // Thông tin người dùng
  const user = {
    username: 'admin',
    email: 'admin@example.com',
    gender: 'male', 
    position: 'Quản Lý',
    // Thêm thông tin khác tùy ý
  };

  // Đường link đến avatar tương ứng với giới tính
  const getAvatarUrl = (gender) => {
    return gender === 'male'
      ? '/images/avatar_default_male.jpg'
      : '/images/avatar_default_female.jpg';
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h1>Thông Tin Cá Nhân</h1>

          <div className="profile-info">
            <div className="avatar-container">
              <img src={getAvatarUrl(user.gender)} alt="Avatar" />
            </div>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Position:</strong> {user.position}</p>
            {/* Thêm thông tin khác của người dùng tùy ý */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
