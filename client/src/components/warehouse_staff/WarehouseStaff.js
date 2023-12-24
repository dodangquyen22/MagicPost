import React, { useState, useContext } from 'react';
import Navbar from '../bar/Navbar';
import { Link } from 'react-router-dom';
import AuthContext from '../variable/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const WarehouseStaff = () => {
    const { role } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showActionsMenu, setShowActionsMenu] = useState(false);


    // Giả sử bạn có một danh sách các đơn hàng
    const [orders, setOrder] = useState([
        { id: 1, status: "Successful", confirm: 'newOrder' },
        { id: 2, status: "Unsuccessful", confirm: '' },
        { id: 3, status: "Cancelled", confirm: '' },
        // Thêm các đơn hàng khác tùy ý
    ]);

    // Lọc đơn hàng dựa trên trạng thái
    // let filteredOrders = orders.filter(order => {
    //     switch (activeTab) {
    //         case "successful":
    //             return order.status === "Successful";
    //         case "unsuccessful":
    //             return order.status === "Unsuccessful";
    //         case "cancelled":
    //             return order.status === "Cancelled";
    //         default:
    //             return true; // Hiển thị tất cả các đơn hàng nếu không có tab nào được chọn
    //     }
    // });

    const handleCheckboxChange = (orderId) => {
        const isSelected = selectedOrders.includes(orderId);
        if (isSelected) {
            setSelectedOrders(selectedOrders.filter(id => id !== orderId));
        } else {
            setSelectedOrders([...selectedOrders, orderId]);
        }
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(orders.map(order => order.id));
        }
        setSelectAll(!selectAll);
    };

    const handleActionsMenuToggle = () => {
        setShowActionsMenu(!showActionsMenu);
    };

    const handleAction = (action) => {
        // Implement actions based on the selected action
        console.log(`Performing ${action} action on selected orders:`, selectedOrders);
        // Reset selected orders and hide the menu
        setSelectedOrders([]);
        setShowActionsMenu(false);
        setSelectAll(false);
    };

    const handlePrint = () => {
        console.log('print');
    }

    const handleEdit = () => {
        console.log('edit');
    }

    const handleCreateOrder = () => {
        console.log('createOrder');
    }

    const handleCopy = () => {
        console.log('copy');
    }

    const handleDelete = () => {
        console.log('delete');
    }



    return (
        <div className="transaction-container">
            <Navbar />
            <div className="content-container">
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
                            <li><Link to="/">Log Out</Link></li>
                        </ul>
                    </div>
                )
                }
                {role !== 'manager' && (
                    <div className="sidebar">
                        <ul>
                            <li>
                                <Link to="/warehousestaff">Thống Kê Đơn Hàng</Link>
                            </li>
                            <li><Link to="/">Log Out</Link></li>
                        </ul>
                    </div>
                )
                }
                <div className="content">
                    <h1>Thống Kê Đơn Hàng</h1>
                    <div className="tab-container">
                        {selectedOrders.length > 0 && (
                            <button>
                                <div className="actions-container">
                                    <div className="actions-menu">
                                        <div onClick={handleActionsMenuToggle}>
                                            <FontAwesomeIcon icon={faBars} /> Thao Tác
                                        </div>
                                        {showActionsMenu && (
                                            <div className="actions-select">
                                                <div onClick={() => handleAction('print')}>In đơn</div>
                                                <div onClick={() => handleAction('edit')}>Chỉnh Sửa Đơn</div>
                                                {/* <div onClick={() => handleAction('changeStatus')}>Thay Đổi Trạng Thái In</div> */}
                                                <div onClick={() => handleAction('createOrder')}>Tạo Đơn Chuyển Hàng</div>
                                                <div onClick={() => handleAction('copy')}>Copy Hoá Đơn </div>
                                                <div onClick={() => handleAction('delete')}>Xoá Đơn</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        )}

                    </div>
                    <div className="order-list">
                        <table>
                            <thead>
                                <tr>
                                    <th className="checkbox-select">
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAllChange}
                                        />

                                    </th>
                                    <th>Mã vận đơn</th>
                                    <th>Mã Đơn Hàng</th>
                                    <th>Người Gửi</th>
                                    <th>Người Nhận</th>
                                    <th>Điểm Giao Dịch Đích</th>
                                    <th>Hàng Hoá</th>
                                    <th>Trạng Thái</th>
                                    <th>Ngày Lập</th>
                                    <th>Thu Hộ</th>
                                    <th>Tổng Cước</th>
                                    <th>Xác Nhận Đơn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedOrders.includes(order.id)}
                                                onChange={() => handleCheckboxChange(order.id)}
                                            />
                                        </td>
                                        <td></td>
                                        <td>{order.id}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            {order.status}
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            {order.confirm === 'newOrder' && (
                                                <button className="confirm-btn">Xác Nhận</button>
                                            )}    
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarehouseStaff;
