import React from 'react';
import logo from './logo.svg';
import './App.css';
import New_picture from "./features/new_picture/New_picture"
import { LoginPage } from './features/loginPage/loginPage';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
    <Route path="/picture" element={<New_picture />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
  );
}

export default App;
