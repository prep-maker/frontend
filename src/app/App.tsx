import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
import WritingViewer from '../features/review/components/WritingViewer/WritingViewer';
import Loading from '../common/components/Loading/Loading';
import Feedback from '../pages/Feedback/Feedback';
import useMobileQuery from '../common/hooks/useMobileQuery';
import { TouchBackend } from 'react-dnd-touch-backend';

const App = () => {
  const isLoggedIn = !!useAppSelector(({ user }) => user.id);
  const isMobile = useMobileQuery();

  const indexPage = isLoggedIn ? (
    <Navigate replace to="/writing" />
  ) : (
    <Navigate replace to="/login" />
  );

  const writingPage = (
    <AuthRequired>
      <Writing />
    </AuthRequired>
  );

  const reviewPage = (
    <AuthRequired>
      <Review />
    </AuthRequired>
  );

  return (
    <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <ErrorAlert />
        <Loading />
        <Routes>
          <Route path="/" element={indexPage} />

          <Route element={<Login />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Route>

          <Route path="/writing" element={writingPage}>
            <Route index element={<WritingList responsive={false} />} />
            <Route path=":writingId" element={<BlockEditor />} />
          </Route>

          <Route path="/review" element={reviewPage}>
            <Route index element={<WritingList responsive={false} />} />
            <Route path=":writingId" element={<WritingViewer />} />
          </Route>

          <Route path="/feedback">
            <Route path=":writingId" element={<Feedback />} />
          </Route>
        </Routes>
      </DndProvider>
    </>
  );
};

export default App;
