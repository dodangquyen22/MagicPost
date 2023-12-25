// src/components/Profile.js

import React, { useState } from 'react';
import Navbar from '../bar/Navbar';
import { Outlet, Link } from "react-router-dom";
import './Profile.css';
import Sidebar from '../bar/Sidebar';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const Profile = () => {
  // Thông tin người dùng
  const user = {
    username: 'admin',
    email: 'admin@example.com',
    gender: 'male',
    position: 'Quản Lý',
    // Thêm thông tin khác tùy ý
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangePassword = () => {
    if (oldPassword === '') {
      toast('Yêu cầu xác minh mật khẩu cũ');
      return;
    }

    if (newPassword === '') {
      toast('Nhâp mật khẩu mới!');
      return;
    }

    if (oldPassword === newPassword) {
      toast('Mật khẩu mới không được trùng với mật khẩu cũ!');
      return;
    }

    

    // Implement logic to change password
    console.log('Changing password to:', newPassword);

    // Close the modal after changing password
    closeModal();
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
            {/* Thêm thông tin khác */}
          </div>
          <button onClick={openModal}>Change Password</button>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Change Password Modal"
            className="react-modal-content"
        overlayClassName="react-modal-overlay"
          >
            <h2>Change Password</h2>
            <label>Mật Khẩu Cũ</label>
            <input
              type="password"
              className='form-control'
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              className='form-control'
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleChangePassword}>Save Password</button>
            <button onClick={closeModal}>Cancel</button>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
