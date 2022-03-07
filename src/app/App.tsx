import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import { useAppSelector } from '../common/hooks/useRedux';
import Writing from '../pages/Writing/Writing';
import ErrorAlert from '../common/components/ErrorAlert/ErrorAlert';
import LoginForm from '../features/user/components/LoginForm/LoginForm';
import SignupForm from '../features/user/components/SignupForm/SignupForm';
import AuthRequired from '../common/components/AuthRequired/AuthRequired';
import BlockEditor from '../features/blocks/components/BlockEditor/BlockEditor';

const App = () => {
  const isLoggedIn = !!useAppSelector(({ user }) => user.id);

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
            <AuthRequired>
              <Writing />
            </AuthRequired>
          }
        >
          <Route path=":writingId" element={<BlockEditor />} />
        </Route>
        <Route path="/review" />
      </Routes>
    </>
  );
};

export default App;
