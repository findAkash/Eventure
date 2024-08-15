import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const PrivateRoute = ({ requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(isAuthenticated, user.role, requiredRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to the user homepage if the role doesn't match
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
