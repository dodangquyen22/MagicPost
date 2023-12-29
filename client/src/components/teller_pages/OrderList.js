import React, { useState, useEffect } from "react";
import Navbar from '../bar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './styles/orderlist.css';
import Sidebar from "../bar/Sidebar";

const ProductList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const pointID = localStorage.getItem('pointID');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("token",token);
        axios.get('http://127.0.0.1:3000/transactionPoint/order?pointID=' + pointID, {
          headers: {
            Authorization: `Bearer ${token}`,
          }, 
        }).then((response) => {
          setOrders(response.data);
          console.log("order data: ", response.data);
        }); 
         // Assuming the response contains the array of orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, []);

  const handleConfirm = async (orderId) => {
    try {
      
      console.log("order id to confirm", orderId);
      // Send the request here
      axios.get('http://127.0.0.1:3000/transactionPoint/order/confirm?orderID=' + orderId + '&pointID=' + pointID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('Confirm response:', response.data);
        });
      
      // Perform any necessary actions after the request is successful
    } catch (error) {
      console.error('Error confirming orders:', error);
    }
  };

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

  const handlePrint = () => {
    console.log('print');
    setSelectedOrders([]);
    setShowActionsMenu(false);
    setSelectAll(false);
  }

  const handleEdit = () => {
    console.log('edit');
    setSelectedOrders([]);
    setShowActionsMenu(false);
    setSelectAll(false);
  }

  const handleCreateOrder = () => {
    console.log('createOrder');
    setSelectedOrders([]);
    setShowActionsMenu(false);
    setSelectAll(false);
  }

  const handleCreateOrderReceiver = () => {
    console.log('createOrderReceiver');
    setSelectedOrders([]);
    setShowActionsMenu(false);
    setSelectAll(false);
  }

  const handleReturn = () => {
    console.log('return');
    setSelectedOrders([]);
    setShowActionsMenu(false);
    setSelectAll(false);
  }

  const handleCopy = () => {
    console.log('copy');
    setSelectedOrders([]);
    setShowActionsMenu(false);
    setSelectAll(false);
  }

  const handleDelete = () => {
    console.log('delete');
    setSelectedOrders([]);
    setShowActionsMenu(false);
    setSelectAll(false);
  }

  const printStatus = (status) => {
    switch (status) {
      case "confirmed":
        return "Vận Chuyển Thành Công";
      case "success":
        return "Vận Chuyển Thành Công";
      case "shipping":
        return "Đang Vận Chuyên";
      case "failed":
        return "Đã Hủy";
      default:
        return status;
    }
  }


  return (
    <div className="order-container">
      <Navbar />
      <div className="content-container">
        <Sidebar />
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
              className={activeTab === "confirmed" ? "active" : ""}
              onClick={() => setActiveTab("confirmed")}
            >
              Vận Chuyển Thành Công
            </button>
            <button
              className={activeTab === "shipping" ? "active" : ""}
              onClick={() => setActiveTab("shipping")}
            >
              Đang Vận Chuyển
              </button>
              <button
              className={activeTab === "failed" ? "active" : ""}
              onClick={() => setActiveTab("failed")}
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
                        <div onClick={() => handlePrint('print')}>In đơn</div>
                        <div onClick={() => handleEdit('edit')}>Chỉnh Sửa Đơn</div>
                        {/* <div onClick={() => handleAction('changeStatus')}>Thay Đổi Trạng Thái In</div> */}
                        <div onClick={() => handleCreateOrder('createOrder')}>Tạo Đơn Đến Điểm Tập Kết</div>
                        <div onClick={() => handleCreateOrderReceiver('createOrderReceiver')}>Tạo Đơn Đến Người Nhận</div>
                        <div onClick={() => handleReturn('return')}>Trả Hàng</div>
                        <div onClick={() => handleCopy('copy')}>Copy Hoá Đơn </div>
                        <div onClick={() => handleDelete('delete')}>Xoá Đơn</div>
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
                  <th>Mã vận đơn</th>
                  <th>Mã Đơn Hàng</th>
                  <th>Đối Tượng Nhận</th>
                  <th>Tên Người Nhận</th>
                  <th>Ngày Gửi</th>
                  <th>Trạng Thái</th>
                  <th>ID Khu Vực Người Nhận </th>
                  <th>Thu Hộ</th>
                  <th>Xác Nhận Giao Thành Công</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.packageID}</td>
                    <td>{order.type == "toWarehouse" ? "Kho": "Khách hàng"}</td>
                    <td>{order.package[0].senderDetails.name}</td>
                    <td>{(order.sendDate).replace("T", " ").replace("Z", "")}</td>
                    <td>{printStatus(order.status)}</td>
                    <td>{order.package[0].receiveAreaID}</td>
                    <td>{order.package[0].cost}</td>
                    <td>
                    <button onClick={() => handleConfirm(order._id)}>Xác nhận</button>
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
