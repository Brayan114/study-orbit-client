// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import our custom hook

function ProtectedRoute() {
  const { user } = useAuth();

  // If there's no user, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If there is a user, render the child route (the dashboard)
  return <Outlet />;
}

export default ProtectedRoute;