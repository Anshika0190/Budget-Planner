import React from 'react';
import './Home.css';
import { FaMoneyBillWave, FaShoppingCart, FaPiggyBank, FaExchangeAlt, FaChartPie } from 'react-icons/fa';

const Home = () => {
  const totalIncome = 50000;
  const totalExpenses = 32000;

  const transactions = [
    { id: 1, category: 'Groceries', amount: 2500, date: '2025-07-10' },
    { id: 2, category: 'Rent', amount: 15000, date: '2025-07-05' },
    { id: 3, category: 'Utilities', amount: 3000, date: '2025-07-03' },
    { id: 4, category: 'Entertainment', amount: 1200, date: '2025-07-01' },
  ];

  const categories = [
    { name: 'Groceries', budget: 5000, spent: 2500 },
    { name: 'Rent', budget: 15000, spent: 15000 },
    { name: 'Utilities', budget: 4000, spent: 3000 },
    { name: 'Entertainment', budget: 3000, spent: 1200 },
  ];

  return (
    <div className="home-container">
      <h1>Budget Dashboard</h1>

      <div className="summary">
        <div className="card income">
          <div className="icon"><FaMoneyBillWave /></div>
          <h2>Total Income</h2>
          <p>₹{totalIncome}</p>
        </div>
        <div className="card expenses">
          <div className="icon"><FaShoppingCart /></div>
          <h2>Total Expenses</h2>
          <p>₹{totalExpenses}</p>
        </div>
        <div className="card savings">
          <div className="icon"><FaPiggyBank /></div>
          <h2>Savings</h2>
          <p>₹{totalIncome - totalExpenses}</p>
        </div>
      </div>

      <div className="section">
        <h2><FaExchangeAlt style={{ marginRight: '8px' }} />Recent Transactions</h2>
        <ul className="transactions">
          {transactions.map(tx => (
            <li key={tx.id}>
              <span>{tx.date}</span>
              <span>{tx.category}</span>
              <span className="amount">₹{tx.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2><FaChartPie style={{ marginRight: '8px' }} />Category Spending</h2>
        {categories.map(cat => {
          const percent = Math.min((cat.spent / cat.budget) * 100, 100);
          return (
            <div key={cat.name} className="category-bar">
              <div className="label">
                <span>{cat.name}</span>
                <span>₹{cat.spent} / ₹{cat.budget}</span>
              </div>
              <div className="bar">
                <div className="fill" style={{ width: `${percent}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
