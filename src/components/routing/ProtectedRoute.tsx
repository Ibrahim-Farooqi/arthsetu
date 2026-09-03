import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = () => {
  // Authentication disabled per user request
  return <Outlet />;
};

export const PublicRoute = () => {
  // Public routes will also just render their content (or we could redirect to dashboard, but rendering Outlet is fine)
  return <Outlet />;
};
