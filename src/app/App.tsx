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
import WritingList from '../features/writings/components/WritingList/WritingList';
import Review from '../pages/Review/Review';
import WritingViewer from '../features/reviews/components/WritingViewer/WritingViewer';
import Loading from '../common/components/Loading/Loading';

const App = () => {
  const isLoggedIn = !!useAppSelector(({ user }) => user.id);

  return (
    <>
      <ErrorAlert />
      <Loading />
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
          <Route index element={<WritingList responsive={false} />} />
          <Route path=":writingId" element={<BlockEditor />} />
        </Route>

        <Route
          path="/review"
          element={
            <AuthRequired>
              <Review />
            </AuthRequired>
          }
        >
          <Route index element={<WritingList responsive={false} />} />
          <Route path=":writingId" element={<WritingViewer />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
