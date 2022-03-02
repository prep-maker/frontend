import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import ErrorAlert from '../common/components/ErrorAlert/ErrorAlert';
import Writing from '../pages/Writing/Writing';
import LoginForm from '../features/user/components/LoginForm/LoginForm';
import SignupForm from '../features/user/components/SignupForm/SignupForm';
import { useAppSelector } from '../common/hooks/useRedux';
import RequiredAuth from '../common/components/RequiredAuth/RequiredAuth';

const App = () => {
  const isLoggedIn = !!useAppSelector((state) => state.user.id);

  return (
    <>
      <ErrorAlert />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate replace to="/writing" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route element={<Login />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Route>
        <Route
          path="/writing"
          element={
            <RequiredAuth>
              <Writing />
            </RequiredAuth>
          }
        />
        <Route path="/review" />
      </Routes>
    </>
  );
};

export default App;
