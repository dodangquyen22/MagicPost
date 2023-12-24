// src/App.js

import React, { useState, useEffect } from 'react';
import AuthProvider from './components/variable/AuthProvider';
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
import TransactionPoint from './components/manager_transaction_point/TransactionPoint';
import ManageTransactionPoints from './components/Manager_page/ManageTransactionPoints';
import axios from 'axios';
import ManageWarehouse from './components/Manager_page/ManageWarehouse';

function App() {

  return (
    <AuthProvider>
      
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<UserMain />} />
          <Route path="/employee" exact element={<EmployeeManagement />} />
          <Route path="/employee/:id" element={<EmployeeProfile />} />
          <Route path="/tellermain" element={<TransactionPage />} />
          <Route path="/tellermain/orderlist" element={<ProductList />} />
          <Route path="/transferreceipt" element={<TransferReceipt />} />
          <Route path="/transactionpoint" element={<TransactionPoint />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/managetranspoints" element={<ManageTransactionPoints />} />
          <Route path="/managewarehouse" element={<ManageWarehouse />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
}
export default App;
