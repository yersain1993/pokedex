import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user) return <>{children}</>;
  else return <Navigate to="/" replace />;
};

export default ProtectedRoute;
