// src/components/EmployeeManagement.js
import './employee.css';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../bar/Navbar';
import Modal from 'react-modal';
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import Sidebar from '../bar/Sidebar';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Nguyen Van A', account: 'A123', password: 'A123', position: 'Giao Dịch Viên', gender: 'Nam' },
    { id: 2, name: 'Tran Thi B', position: 'Nhân Viên Giao Hàng', account: 'B123', password: 'B123', gender: 'Nữ' },
    // Thêm nhân viên khác tùy ý
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState({ id: null, name: '', account: '', password: '', position: '', gender: '' });

  const openModal = (employee) => {
    setEditingEmployee(employee ? { ...employee } : { id: null, name: '', account: '', password: '', position: '', gender: 'Nam' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditEmployee = () => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === editingEmployee.id ? editingEmployee : employee
    );

    setEmployees(updatedEmployees);
    closeModal();
  };

  const handleAddEmployee = () => {
    const newEmployee = {
      id: employees.length + 1,
      name: editingEmployee.name,
      position: editingEmployee.position,
      account: editingEmployee.account,
      password: editingEmployee.password,
      gender: editingEmployee.gender,
    };

    setEmployees([...employees, newEmployee]);
    closeModal();
  };

  const handleDeleteEmployee = (id) => {
    // Hiển thị cảnh báo trước khi xoá
    const shouldDelete = window.confirm('Bạn có chắc muốn xoá nhân viên này?');

    if (shouldDelete) {
      // Lọc ra những nhân viên không có ID trùng với ID được chọn để xoá
      const updatedEmployees = employees.filter((employee) => employee.id !== id);

      // Cập nhật danh sách nhân viên
      setEmployees(updatedEmployees);
    }

  };


  return (
    <div className="employee-container">
      <Navbar />
      <div className="content-container">
        <Sidebar />
        {/* {role === 'manager' && (
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
        {role === 'point leader' && (
          <div className="sidebar">
            <ul>
              <li>
                <Link to="/transactionpoint">Thống Kê Đơn Hàng</Link>
              </li>
              <li>
                <Link to="/employee">Quản Lý Nhân Viên</Link>
              </li>
              <li><Link to="/">Log Out</Link></li>
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
              <li><Link to="/">Log Out</Link></li>
            </ul>
          </div>
        )
        } */}
        <div className="content">
          <h1>Quản lý nhân viên</h1>

          <div>
            <button onClick={() => openModal()}>Thêm Nhân Viên</button>
          </div>

          <div className='employee-list'>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên Nhân Viên</th>
                  <th>Chức Vụ</th>
                  <th>Giới Tính</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td><Link to={`/profile/${employee.id}`}>{employee.name}</Link></td>
                    <td>{employee.position}</td>
                    <td>{employee.gender}</td>
                    <td>
                      <button onClick={() => openModal(employee)}>
                        Sửa
                      </button>
                      <button onClick={() => handleDeleteEmployee(employee.id)}>
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>



          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="react-modal-content"
        overlayClassName="react-modal-overlay">
        <h2>{editingEmployee.id ? 'Sửa' : 'Thêm'} Nhân Viên</h2>
        <form>
          <div className="form-group">
            <label>Tên Nhân Viên:</label>
            <input
              type="text"
              className='form-control'
              value={editingEmployee.name}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
            />
            <label>Tài Khoản</label>
            <input
              type="text"
              className='form-control'
              value={editingEmployee.account}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, account: e.target.value })}
            />
            <label>Mật Khẩu</label>
            <input
              type="text"
              className='form-control'
              value={editingEmployee.password}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, password: e.target.value })}
            />
            <label>Chức Vụ:</label>
            <input
              type="text"
              className='form-control'
              value={editingEmployee.position}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
            />
            <label>Giới Tính:</label>
            <select
              value={editingEmployee.gender}
              className='form-control'
              onChange={(e) => setEditingEmployee({ ...editingEmployee, gender: e.target.value })}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>


        </form>
        <button onClick={editingEmployee.id ? handleEditEmployee : handleAddEmployee}>
          {editingEmployee.id ? 'Lưu' : 'Thêm'}
        </button>
        <button onClick={closeModal}>Đóng</button>
      </Modal>
    </div>

  );
};

export default EmployeeManagement;
