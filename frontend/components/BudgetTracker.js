"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import styles from "@/styles/Home.module.css";

export default function BudgetTracker({ transactions }) {
  const [budgets, setBudgets] = useState({
    Food: 200,
    Shopping: 150,
    Bills: 300,
    Entertainment: 100,
    Travel: 250,
    Other: 100,
  });

  // ✅ Calculate total spent per category
  const spentByCategory = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  // ✅ Prepare chart data
  const chartData = Object.keys(budgets).map((category) => ({
    category,
    budget: budgets[category],
    spent: spentByCategory[category] || 0,
  }));

  // ✅ Show alert if spending exceeds budget
  const exceededBudgets = Object.keys(budgets).filter(
    (category) => spentByCategory[category] > budgets[category]
  );

  return (
    <div className={styles.budgetTracker}>
      <h2>Budget Tracker</h2>

      {/* ✅ Budget Input Fields */}
      <div className={styles.budgetInputs}>
        {Object.keys(budgets).map((category) => (
          <div key={category} className={styles.budgetInput}>
            <label>{category}</label>
            <input
              type="number"
              value={budgets[category]}
              onChange={(e) => setBudgets({ ...budgets, [category]: Number(e.target.value) })}
            />
          </div>
        ))}
      </div>

      {/* ✅ Show Budget vs Spent Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="budget" fill="#4a90e2" />
          <Bar dataKey="spent" fill="#FF6384" />
        </BarChart>
      </ResponsiveContainer>

      {/* ✅ Show Budget Alerts */}
      {exceededBudgets.length > 0 && (
        <div className={styles.alertBox}>
          <h3>⚠ Over Budget</h3>
          <ul>
            {exceededBudgets.map((category) => (
              <li key={category}>You exceeded your {category} budget!</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
