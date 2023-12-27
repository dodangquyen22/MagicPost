// src/components/Navbar.js

import React, { useContext } from 'react';
import { Outlet, Link } from "react-router-dom";
import AuthContext from '../variable/AuthContext';


const Sidebar = () => {
    const { role } = useContext(AuthContext);
    return (
        <div>

            {role === 'manager' && (
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/dashboard">Tổng Quát</Link>
                        </li>
                        <li>
                            <Link to="/employee">Quản Lý Nhân Viên</Link>
                        </li>
                        <li>
                            <Link to="/transactionpoint">Thống Kê Đơn Hàng</Link>
                        </li>
                        <li>
                            <Link to="/managetranspoints">Quản Lý Điểm Giao Dịch</Link>
                        </li>
                        <li>
                            <Link to="/managewarehouse">Quản Lý Điểm Tập Kết</Link>
                        </li>

                    </ul>
                </div>
            )
            }
            {role === 'transaction leader' && (
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/transactionpoint">Thống Kê Đơn Hàng</Link>
                        </li>
                        <li>
                            <Link to="/employee">Quản Lý Nhân Viên</Link>
                        </li>

                    </ul>
                </div>
            )
            }
            {role === 'warehouse leader' && (
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/warehouse">Thống Kê Đơn Hàng</Link>
                        </li>
                        <li>
                            <Link to="/employee">Quản Lý Nhân Viên</Link>
                        </li>

                    </ul>
                </div>
            )
            }
            {role === 'point staff' && (
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/tellermain">Trang Giao Dịch</Link>
                        </li>
                        <li>
                            <Link to="/tellermain/orderlist">Thống Kê Đơn Hàng</Link>
                        </li>
                        <li>
                            <Link to="/">Log Out</Link>
                        </li>
                    </ul>
                </div>
            )}
            {role === "warehouse staff" && (
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/warehousestaff">Thống Kê Đơn Hàng</Link>
                        </li>
                    </ul>
                </div>
            )
            }
        </div>
    );
};

export default Sidebar;
