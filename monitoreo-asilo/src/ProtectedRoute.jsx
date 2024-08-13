import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  
  const session =true;
  
  if (!session) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
