import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';

const RequiredAuth = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = !!useAppSelector(({ user }) => user.id);
  return <>{isLoggedIn ? children : <Navigate to="/login" />}</>;
};

export default RequiredAuth;
