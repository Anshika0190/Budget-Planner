import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Budget from './Pages/Budget/Budget';
import Prediction from './Pages/Prediction/prediction';
import Reports from './Pages/Reports/Reports';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </>
  );
};

export default App;
