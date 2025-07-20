import React from "react";
import "./Home.css";
import { FaMoneyBillWave, FaShoppingCart, FaPiggyBank, FaSyncAlt, FaChartPie } from "react-icons/fa";

const Home = () => {
  const income = 50000;
  const expenses = 32000;
  const savings = income - expenses;

  const transactions = [
    { date: "2025-07-10", category: "Groceries", amount: 2500 },
    { date: "2025-07-05", category: "Rent", amount: 15000 },
    { date: "2025-07-03", category: "Utilities", amount: 3000 },
    { date: "2025-07-01", category: "Entertainment", amount: 1200 },
  ];

  const categorySpending = [
    { category: "Groceries", spent: 2500, limit: 5000 },
    { category: "Rent", spent: 15000, limit: 15000 },
    { category: "Utilities", spent: 3000, limit: 4000 },
    { category: "Entertainment", spent: 1200, limit: 2000 },
  ];

  return (
    <div className="home-container">
      <h2 className="dashboard-title">Budget Dashboard</h2>

      <div className="summary">
        <div className="card income">
          <div className="icon"><FaMoneyBillWave /></div>
          <h2>Income</h2>
          <p>₹{income.toLocaleString()}</p>
        </div>
        <div className="card expenses">
          <div className="icon"><FaShoppingCart /></div>
          <h2>Expenses</h2>
          <p>₹{expenses.toLocaleString()}</p>
        </div>
        <div className="card savings">
          <div className="icon"><FaPiggyBank /></div>
          <h2>Savings</h2>
          <p>₹{savings.toLocaleString()}</p>
        </div>
      </div>

      <div className="section">
        <h2><FaSyncAlt /> Recent Transactions</h2>
        <ul className="transactions">
          {transactions.map((tx, index) => (
            <li key={index}>
              <span>{tx.date}</span>
              <span>{tx.category}</span>
              <span className="amount">₹{tx.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2><FaChartPie /> Category Spending</h2>
        {categorySpending.map((item, index) => {
          const percent = Math.min((item.spent / item.limit) * 100, 100);
          return (
            <div className="category-bar" key={index}>
              <div className="label">
                <span>{item.category}</span>
                <span>₹{item.spent.toLocaleString()} / ₹{item.limit.toLocaleString()}</span>
              </div>
              <div className="bar">
                <div className="fill" style={{ width: `${percent}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="footer">
        © 2025 Budget Planner. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
