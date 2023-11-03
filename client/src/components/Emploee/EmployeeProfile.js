// src/components/EmployeeProfile.js
import React from 'react';

const EmployeeProfile = ({ match }) => {
  const employeeId = match.params.id;
  const employee = {
    id: employeeId,
    name: 'Nguyen Van A',
    position: 'Giao Dịch Viên',
    gender: 'Nam',
  };

  return (
    <div>
      <h1>Profile của Nhân Viên {employee.name}</h1>
      <p>ID: {employee.id}</p>
      <p>Tên: {employee.name}</p>
      <p>Chức Vụ: {employee.position}</p>
      <p>Giới Tính: {employee.gender}</p>
    </div>
  );
};

export default EmployeeProfile;
