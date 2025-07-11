import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Budget from './Pages/Budget/Budget';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add more routes here */}
      <Route path="/budget" element={<Budget />} />
    </Routes>
    
  );
};

export default App;
