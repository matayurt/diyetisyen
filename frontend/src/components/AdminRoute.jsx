import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ user }) => {
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
