import React, { useState } from 'react';
import './Prediction.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const dummyExpenseData = {
  2023: {
    July: [
      { category: 'Groceries', average: 4000 },
      { category: 'Rent', average: 15000 },
      { category: 'Transport', average: 3000 },
      { category: 'Entertainment', average: 2000 }
    ],
    August: [
      { category: 'Groceries', average: 4500 },
      { category: 'Rent', average: 15000 },
      { category: 'Transport', average: 2800 },
      { category: 'Entertainment', average: 2500 }
    ]
  },
  2024: {
    July: [
      { category: 'Groceries', average: 5000 },
      { category: 'Rent', average: 15500 },
      { category: 'Transport', average: 3200 },
      { category: 'Entertainment', average: 3000 }
    ],
    August: [
      { category: 'Groceries', average: 5200 },
      { category: 'Rent', average: 16000 },
      { category: 'Transport', average: 3100 },
      { category: 'Entertainment', average: 2900 }
    ]
  }
};

const Prediction = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedMonth, setSelectedMonth] = useState('July');
  const [adjustments, setAdjustments] = useState({});

  const expenses = dummyExpenseData[selectedYear][selectedMonth];

  const handleChange = (category, value) => {
    setAdjustments({ ...adjustments, [category]: parseInt(value) || 0 });
  };

  const getPrediction = (cat) => {
    const adj = adjustments[cat.category] || 0;
    return cat.average + adj;
  };

  const chartData = expenses.map((cat) => ({
    category: cat.category,
    Current: cat.average,
    Predicted: getPrediction(cat)
  }));

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setAdjustments({});
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setAdjustments({});
  };

  return (
    <div className="prediction-container">
      <div className="top-row">
        <h1>Expense Prediction</h1>
        <div className="selectors">
          <select value={selectedYear} onChange={handleYearChange}>
            {Object.keys(dummyExpenseData).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select value={selectedMonth} onChange={handleMonthChange}>
            {Object.keys(dummyExpenseData[selectedYear]).map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="prediction-table">
        <div className="table-header">
          <span>Category</span>
          <span>Current Avg</span>
          <span>Adjustment</span>
          <span>Predicted</span>
        </div>

        {expenses.map((cat) => (
          <div key={cat.category} className="table-row">
            <span>{cat.category}</span>
            <span>₹{cat.average}</span>
            <input
              type="number"
              placeholder="₹"
              value={adjustments[cat.category] || ''}
              onChange={(e) => handleChange(cat.category, e.target.value)}
            />
            <span className="predicted">₹{getPrediction(cat)}</span>
          </div>
        ))}
      </div>

      <h2 className="chart-heading">Visual Expense Comparison</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Current" fill="#3498db" />
            <Bar dataKey="Predicted" fill="#2ecc71" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Prediction;
