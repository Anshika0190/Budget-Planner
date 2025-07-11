import React, { useState } from 'react';
import './Budget.css';

const Budget = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Groceries', limit: 5000 },
    { id: 2, category: 'Rent', limit: 15000 },
    { id: 3, category: 'Transport', limit: 3000 }
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');
  const [editId, setEditId] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editLimit, setEditLimit] = useState('');

  const handleAdd = () => {
    if (!newCategory || !newLimit) return;
    const newItem = {
      id: Date.now(),
      category: newCategory,
      limit: parseInt(newLimit)
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

  return (
    <div className="budget-container">
      <h1>Manage Monthly Budget</h1>

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

      <div className="budget-list">
        {budgets.map((item) => (
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
                  <p>₹{item.limit}</p>
                </div>
                <div className="budget-actions">
                  <button className="edit" onClick={() => startEdit(item)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budget;
