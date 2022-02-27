import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import ErrorAlert from '../common/components/ErrorAlert/ErrorAlert';
import Writing from '../pages/Writing/Writing';

const App = () => (
  <>
    <ErrorAlert />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/writing" element={<Writing />} />
      <Route path="/review" />
    </Routes>
  </>
);

export default App;
