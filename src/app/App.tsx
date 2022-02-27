import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/writing" />
    <Route path="/review" />
  </Routes>
);

export default App;
