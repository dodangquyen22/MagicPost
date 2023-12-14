// src/App.js

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Manager_page/Dashboard';
import EmployeeManagement from './components/Emploee/EmployeeManagement';
import Login from './components/log_in/Login';
import Profile from './components/general_pages/Profile';
import EmployeeProfile from './components/Emploee/EmployeeProfile';
import TransactionPage from './components/teller_pages/TellerMain';
import UserMain from './components/userDisplay/UserMain';
import ProductList from './components/teller_pages/OrderList';
import TransferReceipt from './components/teller_pages/TransferReceipt';

function App() {
  // const [activePage, setActivePage] = useState('dashboard');

  // const handleMenuClick = (page) => {
  //   setActivePage(page);
  // };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<UserMain />} />
          <Route path="/employee" exact element={<EmployeeManagement />} />
          <Route path="/employee/:id" element={<EmployeeProfile />} />
          <Route path="/tellermain" element={<TransactionPage />} />
          <Route path="/orderlist" element={<ProductList />} />
          <Route path="/transferreceipt" element={<TransferReceipt />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
