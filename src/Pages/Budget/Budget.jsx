import React, { useEffect, useState } from 'react';
import './Budget.css';

const Budget = () => {
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : [
      { id: 1, category: 'Groceries', limit: 5000, used: 2500 },
      { id: 2, category: 'Rent', limit: 15000, used: 15000 },
      { id: 3, category: 'Transport', limit: 3000, used: 1800 },
    ];
  });

  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');
  const [editId, setEditId] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editLimit, setEditLimit] = useState('');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const handleAdd = () => {
    if (!newCategory || !newLimit) return;
    const newItem = {
      id: Date.now(),
      category: newCategory,
      limit: parseInt(newLimit),
      used: 0,
    };
    setBudgets([...budgets, newItem]);
    setNewCategory('');
    setNewLimit('');
  };

  const handleDelete = (id) => {
    setBudgets(budgets.filter(item => item.id !== id));
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditCategory(item.category);
    setEditLimit(item.limit);
  };

  const handleSave = (id) => {
    setBudgets(budgets.map(item =>
      item.id === id ? { ...item, category: editCategory, limit: parseInt(editLimit) } : item
    ));
    setEditId(null);
    setEditCategory('');
    setEditLimit('');
  };

  // Summary values
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalUsed = budgets.reduce((sum, b) => sum + b.used, 0);
  const totalRemaining = totalBudget - totalUsed;

  return (
    <div className="budget-container">
      <h1>Manage Monthly Budget</h1>

      {/* Summary Section */}
      <div className="budget-summary">
        <div className="summary-card">
          <h3>Total Budget</h3>
          <p>₹{totalBudget}</p>
        </div>
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p>₹{totalUsed}</p>
        </div>
        <div className="summary-card">
          <h3>Remaining</h3>
          <p>₹{totalRemaining}</p>
        </div>
      </div>

      {/* Add New Budget */}
      <div className="budget-form">
        <input
          type="text"
          placeholder="Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Limit (₹)"
          value={newLimit}
          onChange={(e) => setNewLimit(e.target.value)}
        />
        <button onClick={handleAdd}>Add Budget</button>
      </div>

      {/* Budget Cards */}
      <div className="budget-list">
        {budgets.map((item) => {
          const percentUsed = Math.min((item.used / item.limit) * 100, 100);

          return (
            <div className="budget-card" key={item.id}>
              {editId === item.id ? (
                <>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  />
                  <input
                    type="number"
                    value={editLimit}
                    onChange={(e) => setEditLimit(e.target.value)}
                  />
                  <div className="budget-actions">
                    <button className="save" onClick={() => handleSave(item.id)}>Save</button>
                    <button className="cancel" onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3>{item.category}</h3>
                    <p>₹{item.used} / ₹{item.limit}</p>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill ${percentUsed >= 100 ? 'over' : percentUsed >= 80 ? 'warning' : ''}`}
                        style={{ width: `${percentUsed}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="budget-actions">
                    <button className="edit" onClick={() => startEdit(item)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budget;
