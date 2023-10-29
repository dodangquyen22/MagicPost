// src/App.js

import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import EmployeeManagement from './components/Emploee/EmployeeManagement';
import Login from './components/log_in/Login';
import Navbar from './components/bar/Navbar';

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
          <Route path="/employee" element={<EmployeeManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
