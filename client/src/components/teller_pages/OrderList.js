import React, { useState, useEffect } from "react";
import Navbar from '../bar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './styles/orderlist.css';

const ProductList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [orders, setOrders] = useState([]);

  // Temporaly fixed id
  var pointID = 25;

  // Giả sử bạn có một danh sách các đơn hàng
  // const orders = [
  //   { id: 1, status: "Successful", printed: true },
  //   { id: 2, status: "Unsuccessful", printed: false },
  //   { id: 3, status: "Cancelled", printed: false },
  //   // Thêm các đơn hàng khác tùy ý
  // ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/order/?pointID=' + pointID); 
        console.log(response.data);
        setOrders(response.data); // Assuming the response contains the array of orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, []);

  const handleConfirm = async (orderId) => {
    try {
      // Send the request here
      const response = await axios.get('http://127.0.0.1:3000/order/confirm?orderID=' + orderId);
      console.log('Confirm response:', response.data);
      // Perform any necessary actions after the request is successful
    } catch (error) {
      console.error('Error confirming orders:', error);
    }
  };

  // Lọc đơn hàng dựa trên trạng thái
  const filteredOrders = orders.filter(order => {
    switch (activeTab) {
      case "successful":
        return order.status === "Successful";
      case "unsuccessful":
        return order.status === "Unsuccessful";
      case "cancelled":
        return order.status === "Cancelled";
      default:
        return true; // Hiển thị tất cả các đơn hàng nếu không có tab nào được chọn
    }
  });

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
      setSelectedOrders(filteredOrders.map(order => order.id));
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


  return (
    <div className="order-container">
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
          </ul>
        </div>
        <div className="content">
          <h2>Quản lý Đơn Hàng</h2>
          <div className="tab-container">
            <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              Tất Cả
            </button>
            <button
              className={activeTab === "successful" ? "active" : ""}
              onClick={() => setActiveTab("successful")}
            >
              Vận Chuyển Thành Công
            </button>
            <button
              className={activeTab === "unsuccessful" ? "active" : ""}
              onClick={() => setActiveTab("unsuccessful")}
            >
              Vận Chuyển Không Thành Công
            </button>
            <button
              className={activeTab === "cancelled" ? "active" : ""}
              onClick={() => setActiveTab("cancelled")}
            >
              Đã Hủy
            </button>
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
                        <div onClick={() => handleAction('changeStatus')}>Thay Đổi Trạng Thái In</div>
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
                  <th>Hàng Hoá</th>
                  <th>Trạng Thái</th>
                  <th>Ngày Lập</th>
                  <th>Thu Hộ</th>
                  <th>Tổng Cước</th>
                  <th>Xác Nhận Thành Công</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
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
                    <td>{order.status}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                    <button onClick={() => handleConfirm(order.id)}>Xác nhận</button>
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

export default ProductList;
