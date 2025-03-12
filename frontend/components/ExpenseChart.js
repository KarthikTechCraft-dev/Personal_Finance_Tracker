"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import styles from "@/styles/Home.module.css"; // Import styles for UI

// Define category-based colors
const categoryColors = {
  Food: "#FF6384",
  Shopping: "#36A2EB",
  Bills: "#FFCE56",
  Entertainment: "#4BC0C0",
  Travel: "#9966FF",
  Other: "#999999",
};

export default function ExpenseChart({ transactions }) {
  const [chartType, setChartType] = useState("Bar"); // Default: Bar chart

  // Aggregate expenses by category
  const categoryData = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const chartData = Object.keys(categoryData).map((category) => ({
    category,
    amount: categoryData[category],
  }));

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Expense Overview</h3>

      {/* 🔄 Chart Type Toggle Buttons */}
      <div className={styles.chartControls}>
        {["Bar", "Line", "Pie"].map((type) => (
          <button
            key={type}
            className={chartType === type ? styles.activeButton : styles.chartButton}
            onClick={() => setChartType(type)}
          >
            {type} Chart
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={350}>
        {chartType === "Bar" && (
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="category" tick={{ fill: "#666" }} />
            <YAxis tick={{ fill: "#666" }} />
            <Tooltip contentStyle={{ backgroundColor: "#4a90e2", color: "#fff", borderRadius: "6px" }} />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="amount" barSize={40} radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={categoryColors[entry.category] || "#8884d8"} />
              ))}
            </Bar>
          </BarChart>
        )}

        {chartType === "Line" && (
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="category" tick={{ fill: "#666" }} />
            <YAxis tick={{ fill: "#666" }} />
            <Tooltip contentStyle={{ backgroundColor: "#4a90e2", color: "#fff", borderRadius: "6px" }} />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="amount" stroke="#4a90e2" strokeWidth={3} dot={{ fill: "#4a90e2", r: 5 }} />
          </LineChart>
        )}

        {chartType === "Pie" && (
          <PieChart>
            <Tooltip contentStyle={{ backgroundColor: "#4a90e2", color: "#fff", borderRadius: "6px" }} />
            <Legend verticalAlign="top" height={36} />
            <Pie data={chartData} dataKey="amount" nameKey="category" outerRadius={120} label>
              {chartData.map((entry, index) => (
                <Cell key={`pie-${index}`} fill={categoryColors[entry.category] || "#8884d8"} />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
