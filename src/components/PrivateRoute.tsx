import React from 'react';
import { Navigate } from 'react-router-dom';
import { decodeToken} from '../utils/decodeToken';

  interface PrivateRouteProps {
    children: React.ReactElement;
    requiredRole?: string; // Specify required role
  }

const PrivateRoute = ({children , requiredRole}:PrivateRouteProps) => {

    try {
      const currentTime = Date.now() / 1000;
      const decodedToken = decodeToken();
    
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
      }
      
      const role = decodedToken.role

      if (requiredRole && role != requiredRole) {
        return <Navigate to="/unauthorized" replace />;
      }

      return children;
      
    } catch (error) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }
};

export default PrivateRoute;
