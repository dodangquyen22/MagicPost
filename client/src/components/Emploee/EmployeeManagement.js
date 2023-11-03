// src/components/EmployeeManagement.js
import './employee.css';

import React, { useState } from 'react';
import Navbar from '../bar/Navbar';
import Modal from 'react-modal';
import { Outlet, Link } from "react-router-dom";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Nguyen Van A', position: 'Giao Dịch Viên', gender: 'Nam'},
    { id: 2, name: 'Tran Thi B', position: 'Nhân Viên Giao Hàng', gender: 'Nữ' },
    // Thêm nhân viên khác tùy ý
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState({ id: null, name: '', position: '', gender: '' });

  const openModal = (employee) => {
    setEditingEmployee(employee ? { ...employee } : { id: null, name: '', position: '', gender: '' });
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
        <div className="sidebar">
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/employee">Quản Lý Nhân Viên</Link>
            </li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/">Log Out</Link></li>
          </ul>
        </div>
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
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>{editingEmployee.id ? 'Sửa' : 'Thêm'} Nhân Viên</h2>
        <label>Tên Nhân Viên:</label>
        <input
          type="text"
          value={editingEmployee.name}
          onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
        />
        <label>Chức Vụ:</label>
        <input
          type="text"
          value={editingEmployee.position}
          onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
        />
        <label>Giới Tính:</label>
        <select
          value={editingEmployee.gender}
          onChange={(e) => setEditingEmployee({ ...editingEmployee, gender: e.target.value })}
        >
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
        <button onClick={editingEmployee.id ? handleEditEmployee : handleAddEmployee}>
          {editingEmployee.id ? 'Lưu' : 'Thêm'}
        </button>
        <button onClick={closeModal}>Đóng</button>
      </Modal>
    </div>

  );
};

export default EmployeeManagement;
