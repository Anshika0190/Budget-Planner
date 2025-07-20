import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">💰 Budget Planner</div>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/budget">Budget</NavLink></li>
        <li><NavLink to="/reports">Reports</NavLink></li>
        <li><NavLink to="/prediction">Prediction</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
