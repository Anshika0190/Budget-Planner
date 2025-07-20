import React, { useState, useEffect } from 'react';
import './Reports.css';
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

const COLORS = ['#4caf50', '#f44336', '#2196f3', '#ff9800'];

const monthlyData = {
  January: { income: 30000, expenses: [
    { category: 'Rent', amount: 15000 },
    { category: 'Groceries', amount: 5000 },
    { category: 'Transport', amount: 2000 },
  ]},
  February: { income: 28000, expenses: [
    { category: 'Rent', amount: 15000 },
    { category: 'Groceries', amount: 4500 },
    { category: 'Transport', amount: 2500 },
    { category: 'Entertainment', amount: 1000 },
  ]},
  March: { income: 31000, expenses: [
    { category: 'Rent', amount: 15500 },
    { category: 'Groceries', amount: 4800 },
    { category: 'Transport', amount: 2200 },
    { category: 'Shopping', amount: 2000 },
  ]},
};

const monthList = Object.keys(monthlyData);

const Reports = () => {
  const [startMonth, setStartMonth] = useState('January');
  const [endMonth, setEndMonth] = useState('March');
  const [savedReports, setSavedReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const startIndex = monthList.indexOf(startMonth);
  const endIndex = monthList.indexOf(endMonth);
  const selectedMonths = monthList.slice(startIndex, endIndex + 1);

  const totalIncome = selectedMonths.reduce((acc, month) => acc + monthlyData[month].income, 0);
  const allExpenses = selectedMonths.flatMap((month) => monthlyData[month].expenses);

  const categoryTotals = allExpenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const expenseData = Object.keys(categoryTotals).map(cat => ({
    category: cat,
    amount: categoryTotals[cat]
  }));

  const totalExpenses = expenseData.reduce((sum, e) => sum + e.amount, 0);
  const savings = totalIncome - totalExpenses;

  const pieData = [
    { name: 'Expenses', value: totalExpenses },
    { name: 'Savings', value: savings },
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('savedReports')) || [];
    setSavedReports(data);
  }, []);

  const saveReport = () => {
    const reportName = `${startMonth}-${endMonth}`;
    const newReport = {
      name: reportName,
      startMonth,
      endMonth,
      expenseData,
      totalIncome,
      totalExpenses,
      savings,
      pieData,
    };
    const updatedReports = [...savedReports, newReport];
    localStorage.setItem('savedReports', JSON.stringify(updatedReports));
    setSavedReports(updatedReports);
    alert(`Report "${reportName}" saved!`);
  };

  const loadReport = (reportName) => {
    const report = savedReports.find(r => r.name === reportName);
    if (report) {
      setSelectedReport(report);
    }
  };

  const currentData = selectedReport || {
    expenseData,
    totalIncome,
    totalExpenses,
    savings,
    pieData,
    name: `${startMonth}-${endMonth}`
  };

  const exportSavedPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Monthly Financial Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`Range: ${currentData.name}`, 14, 30);
    doc.text(`Income: ₹${currentData.totalIncome}`, 14, 40);
    doc.text(`Expenses: ₹${currentData.totalExpenses}`, 14, 50);
    doc.text(`Savings: ₹${currentData.savings}`, 14, 60);

    const tableRows = currentData.expenseData.map((item) => [item.category, `₹${item.amount}`]);

    doc.autoTable({
      head: [['Category', 'Amount']],
      body: tableRows,
      startY: 70,
    });

    doc.save(`report_${currentData.name}.pdf`);
  };

  const exportSavedCSV = () => {
    const data = [
      ['Category', 'Amount'],
      ...currentData.expenseData.map((item) => [item.category, item.amount]),
      [],
      ['Total Income', currentData.totalIncome],
      ['Total Expenses', currentData.totalExpenses],
      ['Savings', currentData.savings]
    ];

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `report_${currentData.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-container">
      <h1>Reports</h1>

      <div className="filter-row">
        <label>
          Start Month:
          <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
            {monthList.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>

        <label>
          End Month:
          <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
            {monthList.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="export-buttons">
        <button onClick={saveReport}>Save Report</button>
        {savedReports.length > 0 && (
          <>
            <select onChange={(e) => loadReport(e.target.value)} defaultValue="">
              <option value="" disabled>Select Saved Report</option>
              {savedReports.map((r, idx) => (
                <option key={idx} value={r.name}>{r.name}</option>
              ))}
            </select>
            <button onClick={exportSavedPDF}>Export PDF</button>
            <button onClick={exportSavedCSV}>Export CSV</button>
          </>
        )}
      </div>

      <div className="report-summary">
        <div className="summary-card income">Income: ₹{currentData.totalIncome}</div>
        <div className="summary-card expenses">Expenses: ₹{currentData.totalExpenses}</div>
        <div className="summary-card savings">Savings: ₹{currentData.savings}</div>
      </div>

      <div className="charts-section">
        <div className="chart-box">
          <h2>Spending by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData.expenseData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2>Income vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={currentData.pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {currentData.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
