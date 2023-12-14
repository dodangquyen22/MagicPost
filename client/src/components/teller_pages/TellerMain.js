import React, { useState } from 'react';
import Navbar from '../bar/Navbar';
import { Link } from 'react-router-dom';
import RecordTransaction from './RecordTransaction';
import './styles/tellermain.css';
import ConfirmReturn from './ConfirmReturn';

const TransactionPage = () => {
  const [selectedTab, setSelectedTab] = useState('record'); // Tab mặc định

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="transaction-container">
      <Navbar />
      <div className="content-container">
        <div className="sidebar">
          <ul>
            <li>
              <Link to="/tellermain">Trang Giao Dịch</Link>
            </li>
            <li>
              <Link to="/orderlist">Thống Kê Đơn Hàng</Link>
            </li>
            <li>
              <Link to="/">Log Out</Link>
            </li>
            <li><Link to="/transferreceipt">In đơn hàng</Link></li>
          </ul>
        </div>
        <div className="content">
          <h1>Giao Dịch Viên</h1>

          <div className="tabs">
            <button
              className={selectedTab === 'record' ? 'active' : ''}
              onClick={() => handleTabChange('record')}
            >
              Ghi Nhận Hàng
            </button>
            <button
              className={selectedTab === 'createOrder' ? 'active' : ''}
              onClick={() => handleTabChange('createOrder')}
            >
              Tạo Đơn Chuyển Hàng
            </button>
            <button
              className={selectedTab === 'confirmReturn' ? 'active' : ''}
              onClick={() => handleTabChange('confirmReturn')}
            >
              Xác Nhận Hàng Trả Về
            </button>
            {/* Thêm các tab khác tùy theo chức năng */}
          </div>

          <div className="tab-content">
            {selectedTab === 'record' && (
              // Giao diện cho chức năng Ghi Nhận Hàng
              <div>
                <RecordTransaction />
              </div>
            )}
            {selectedTab === 'createOrder' && (
              // Giao diện cho chức năng Tạo Đơn Chuyển Hàng
              <div>
                {/* ... */}
              </div>
            )}
            {selectedTab === 'confirmReturn' && (
              // Giao diện cho chức năng Xác Nhận Hàng Trả Về
              <div>
                <ConfirmReturn />
              </div>
            )}
            {/* Thêm các phần giao diện cho các chức năng khác */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
