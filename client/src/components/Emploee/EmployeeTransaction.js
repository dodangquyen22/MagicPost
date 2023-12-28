// src/components/EmployeeManagement.js
import './employee.css';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../bar/Navbar';
import Modal from 'react-modal';
import { Outlet, Link } from "react-router-dom";
import Sidebar from '../bar/Sidebar';
import axios from 'axios';

const EmployeeTransaction = () => {
  const [username, setUsername] = useState([]);

  const [name, setName] = useState('');
  const [usernames, setUsernames] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');


  useEffect(() => {
    getData()
}, []);

const getData = () => {
    const token =  localStorage.getItem('token');
    const idArea = localStorage.getItem('idArea')
    console.log(token);
    axios.post(
      'http://localhost:3000/transactionLeader/listAcount',
      { role: "transaction leader", idArea: idArea }, // Role as part of the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
        .then((response) => {
            const users = response.data;
            setUsername(users);
        })
        .catch((error) => {

        })
}

  const [employees, setEmployees] = useState([
    { id: 1, name: 'Nguyen Van A', account: 'A123', password: 'A123', position: 'Giao Dịch Viên', gender: 'Nam' },
    { id: 2, name: 'Tran Thi B', position: 'Nhân Viên Giao Hàng', account: 'B123', password: 'B123', gender: 'Nữ' },
    // Thêm nhân viên khác tùy ý
  ]);

  const addEmployee = async(event) => {
        event.preventDefault();
          try {
            const token =  localStorage.getItem('token');
            const district = localStorage.getItem('district');
            console.log(district)
            const province = localStorage.getItem('province');
            const response = await axios.post('http://localhost:3000/transactionLeader/resgister', {
                name,
                gender,
                username: usernames,
                password,
                email,
                phone,
                district,
                province,
                role: "transaction staff"
              }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data.message);
            getData();
            closeModal();
          } catch (error) {
            console.log("lỗi")
            console.error(error);
            // Xử lý lỗi (nếu có)
          }
  };


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

  const handleDeleteEmployee = async(id) => {
    // Hiển thị cảnh báo trước khi xoá
    const shouldDelete = window.confirm('Bạn có chắc muốn xoá nhân viên này?');

    if (shouldDelete) {
        try {
            //   const token = localStorage.getItem('token');
        
              // Make a request to delete the point with the given ID using DELETE method
              const token =  localStorage.getItem('token');
              console.log(token);
              const response = await axios.delete(`http://localhost:3000/transactionLeader/delete/${id}`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
        
            //   console.log(response.data.message);
              
              // Assuming getData and closeModal are defined elsewhere in your code
              getData();
              closeModal();
            } catch (error) {
              // Handle error, e.g., show an error message to the user
              console.error('Error deleting point:', error);
            }
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
                  <th>Tỉnh/Thành phố</th>
                  <th>Quận/Huyện</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {username.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee._id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.province}</td>
                    <td>{employee.district}</td>
                    <td>
                    <button onClick={() => openModal(employee)}>
                        Sửa
                      </button>
                    <button onClick={() => handleDeleteEmployee(employee._id)}>
                        Xóa
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
        <form onSubmit={addEmployee}>
      <div className="form-group">
        <label htmlFor="name">Họ và Tên</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="username">Tên đăng nhập</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={usernames}
          onChange={(event) => setUsernames(event.target.value)}
        />

        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label htmlFor="gender">Giới Tính</label>
        <input
          type="text"
          className="form-control"
          id="gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Thêm
      </button>
      <button className="btn btn-secondary" onClick={closeModal}>
        Đóng
      </button>
    </form>
        {/* <button onClick={editingEmployee.id ? handleEditEmployee : handleAddEmployee}>
          {editingEmployee.id ? 'Lưu' : 'Thêm'}
        </button> */}
      </Modal>
    </div>

  );
};

export default EmployeeTransaction;
