import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import ErrorAlert from '../common/components/ErrorAlert/ErrorAlert';

const App = () => (
  <>
    <ErrorAlert />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/writing" />
      <Route path="/review" />
    </Routes>
  </>
);

export default App;
