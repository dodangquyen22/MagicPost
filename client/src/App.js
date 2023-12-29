// src/App.js

import React, { useState, useEffect } from 'react';
import AuthProvider from './components/variable/AuthProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Manager_page/Dashboard';
import EmployeeManagement from './components/Emploee/EmployeeManagement';
import Login from './components/log_in/Login';
import EmployeeProfile from './components/Emploee/EmployeeProfile';
import TransactionPage from './components/teller_pages/TellerMain';
import UserMain from './components/userDisplay/UserMain';
import ProductList from './components/teller_pages/OrderList';
import TransferReceipt from './components/teller_pages/TransferReceipt';
import TransactionPoint from './components/manager_transaction_point/TransactionPoint';
import ManageTransactionPoints from './components/Manager_page/ManageTransactionPoints';
import axios from 'axios';
import ManageWarehouse from './components/Manager_page/ManageWarehouse';
import WareHouse from './components/manager_warehouse/Warehouse';
import WarehouseStaff from './components/warehouse_staff/WarehouseStaff';
import EmployeeWarehouse from './components/Emploee/EmployeeWarehouse';
import EmployeeTransaction from './components/Emploee/EmployeeTransaction';
import WarehousePackage from './components/warehouse_staff/WareHousePackage';

function App() {

  return (
    <AuthProvider>
      
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* trang chủ admin */}
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/employee" element={<EmployeeManagement />} />
          {/* trang người dùng */}
          <Route path="/user" element={<UserMain />} />
          <Route path="/warehouse/employee" exact element={<EmployeeWarehouse />} />
          <Route path="/transaction/employee" exact element={<EmployeeTransaction />} />
          {/* <Route path="/employee/:id" element={<EmployeeProfile />} /> */}
          {/* trang giao dịch viên */}
          <Route path="/tellermain" element={<TransactionPage />} />
          {/* thống kê đơn hàng giao dịch viên */}
          <Route path="/tellermain/orderlist" element={<ProductList />} />
          {/* in đơn hàng */}
          <Route path="/transferreceipt" element={<TransferReceipt />} />
          {/* trưởng điểm giao dịch */}
          <Route path="/transactionpoint" element={<TransactionPoint />} />
          {/* trưởng điểm tập kết */}
          <Route path='/warehouse' element={<WareHouse />}></Route>
          {/* nhân viên điểm tập kết */}
          <Route path='/warehousestaff' element={<WarehouseStaff  />}></Route>  
          <Route path="/warehousestaff/package" element={<WarehousePackage />} />

          {/* quản lí điểm giao dịch admin */}
          <Route path="/managetranspoints" element={<ManageTransactionPoints />} />
          {/* quản lí điểm tập kết admin */}
          <Route path="/managewarehouse" element={<ManageWarehouse />} />
          <Route path="*" element={<h1>Not Found</h1>} />

        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
}
export default App;
