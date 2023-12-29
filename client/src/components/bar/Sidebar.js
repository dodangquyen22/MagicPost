// src/components/Navbar.js

import React, { useContext, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import AuthContext from '../variable/AuthContext';

const Sidebar = () => {
    const { role } = useContext(AuthContext);
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const getLinks = (links) => (
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            <button onClick={toggleSidebar}>{isSidebarOpen ? 'Close' : 'Open'} Sidebar</button>
            {isSidebarOpen && (
            <ul>
                {links.map(({ to, label }) => (
                    <li key={to}>
                        <Link to={to}>{label}</Link>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );

    const roleLinks = {
        manager: [
            { to: '/dashboard', label: 'Tổng Quát' },
            { to: '/employee', label: 'Quản Lý Nhân Viên' },
            { to: '/transactionpoint', label: 'Thống Kê Đơn Hàng' },
            { to: '/managetranspoints', label: 'Quản Lý Điểm Giao Dịch' },
            { to: '/managewarehouse', label: 'Quản Lý Điểm Tập Kết' },
        ],
        'transaction leader': [
            { to: '/transactionpoint', label: 'Thống Kê Đơn Hàng' },
            { to: '/transaction/employee', label: 'Quản Lý Nhân Viên' },
        ],
        'warehouse leader': [
            { to: '/warehouse', label: 'Thống Kê Đơn Hàng' },
            { to: '/warehouse/employee', label: 'Quản Lý Nhân Viên' },
        ],
        'transaction staff': [
            { to: '/tellermain', label: 'Trang Giao Dịch' },
            { to: '/tellermain/orderlist', label: 'Thống Kê Đơn Hàng' },
        ],
        'warehouse staff': [
            { to: '/warehousestaff', label: 'Thống Kê Đơn Hàng' },
            { to: '/warehousestaff/package', label: 'Quản Lý Kiện Hàng' },
        ],
    };

    return roleLinks[role] && getLinks(roleLinks[role]);
};

export default Sidebar;
