import React, { useState, useEffect } from 'react';
import Navbar from '../bar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../bar/Sidebar';
// import { use } from '../../../../server/src/routes/transactionPointStaff';
import axios from 'axios';

const TransactionPoint = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [orders, setOrder] = useState([]);

  const pointID = localStorage.getItem('pointID');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/transactionPoint/order?pointID=' + pointID, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log("order data: ", response.data);
      setOrder(response.data);
    }).catch((error) => {
      console.error('Error fetching orders:', error);
    });


  }, [])
  // Lọc đơn hàng dựa trên trạng thái
  let filteredOrders = orders.filter(order => {
    switch (activeTab) {
      case "confirmed":
        return order.status === "confirmed";
      case "failed":
        return order.status === "failed";
      case "shipping":
        return order.status === "shipping";
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
    <div className="transaction-container">
      <Navbar />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h1>Thống Kê Đơn Hàng</h1>
          <div className="tab-container">
            <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              Tất Cả
            </button>
            <button
              className={activeTab === "confirmed" ? "active" : ""}
              onClick={() => setActiveTab("confirmed")}
            >
              Vận Chuyển Thành Công
            </button>
            <button
              className={activeTab === "failed" ? "active" : ""}
              onClick={() => setActiveTab("failed")}
            >
              Vận Chuyển Không Thành Công
            </button>
            <button
              className={activeTab === "shipping" ? "active" : ""}
              onClick={() => setActiveTab("shipping")}
            >
              Đang vận chuyển
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
                    <td>{order._id}</td>
                    <td></td>
                    <td>{order.type == "toWarehouse" ? "Gửi kho": "Gửi khách"}</td>
                    <td>{order.type == "toWarehouse" ? order.receive_point_id: ""}</td>
                    <td></td>
                    <td>
                      {order.status}
                    </td>
                    <td>{order.sendDate}</td>
                    <td>{order.cost}</td>
                    <td></td>
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

export default TransactionPoint;
