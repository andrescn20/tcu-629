import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  exp: number;
}

interface PrivateRouteProps {
  children: React.ReactElement; 
}

const PrivateRoute = ({children}:PrivateRouteProps) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
      }

      return children;
    } catch (error) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
