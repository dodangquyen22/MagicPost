// AuthProvider.js
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    // Lấy giá trị từ Local Storage hoặc Session Storage khi component mount
    const storedRole = sessionStorage.getItem('userRole');
    const storedUser = sessionStorage.getItem('user');
    if (storedRole) {
      setRole(storedRole);
    }
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const setRoleValue = (newRole) => {
    setRole(newRole);
    // Lưu giá trị vào Local Storage hoặc Session Storage khi giá trị thay đổi
    sessionStorage.setItem('userRole', newRole);
  };

  const setUserValue = (newUser) => {
    setUser(newUser);
    // Lưu giá trị vào Local Storage hoặc Session Storage khi giá trị thay đổi
    sessionStorage.setItem('user', newUser);
  }

  return (
    <AuthContext.Provider value={{ role, setRole: setRoleValue, user, setUser: setUserValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
