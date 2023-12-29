import React, { useState } from 'react';
import Navbar from '../bar/Navbar';
import { Link } from 'react-router-dom';
import RecordTransaction from './RecordTransaction';
import './styles/tellermain.css';
import ConfirmReturn from './ConfirmReturn';
import ConfirmOrder from './ConfirmOrder';
import Sidebar from '../bar/Sidebar';
import StoredPackages from './StoredPackages';

const TransactionPage = () => {
  const [selectedTab, setSelectedTab] = useState('record'); // Tab mặc định

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="transaction-container">
      <Navbar />
      <div className="content-container">
        <Sidebar />
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
              className={selectedTab === 'confirmReturn' ? 'active' : ''}
              onClick={() => handleTabChange('confirmReturn')}
            >
              Xác Nhận Hàng Trả Về
            </button>
            <button
              className={selectedTab === 'storedPackage' ? 'active' : ''}
              onClick={() => handleTabChange('storedPackage')}
            >
              Quản Lý Hàng Lưu Tại Điểm
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
                <ConfirmOrder />
              </div>
            )}
            {selectedTab === 'confirmReturn' && (
              // Giao diện cho chức năng Xác Nhận Hàng Trả Về
              <div>
                <ConfirmReturn />
              </div>
            )}
            {selectedTab === 'storedPackage' && (
              // Giao diện cho chức năng liệt kê hàng lưu tại điểm
              <div>
                <StoredPackages />
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
