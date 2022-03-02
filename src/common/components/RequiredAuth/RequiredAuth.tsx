import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';

const RequiredAuth = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = !!useAppSelector((state) => state.user.id);
  return <>{isLoggedIn ? children : <Navigate to="/login" />}</>;
};

export default RequiredAuth;
