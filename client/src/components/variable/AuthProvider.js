// AuthProvider.js
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    // Lấy giá trị từ Local Storage hoặc Session Storage khi component mount
    const storedRole = sessionStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const setRoleValue = (newRole) => {
    setRole(newRole);
    // Lưu giá trị vào Local Storage hoặc Session Storage khi giá trị thay đổi
    sessionStorage.setItem('userRole', newRole);
  };

  return (
    <AuthContext.Provider value={{ role, setRole: setRoleValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
