"use client";
import { useState } from "react";
import axios from "axios";
import styles from "@/styles/Home.module.css";

export default function TransactionForm({ onAdd }) {
  const [formData, setFormData] = useState({ amount: "", date: "", description: "", category: "" });
  const [error, setError] = useState(""); // ✅ For validation errors
  const [loading, setLoading] = useState(false); // ✅ Loading state for better UX

  // ✅ Predefined categories
  const categories = ["Food", "Shopping", "Bills", "Entertainment", "Travel", "Other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // ✅ Reset error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation: Ensure all fields are filled
    if (!formData.amount || !formData.date || !formData.description || !formData.category) {
      setError("⚠ Please fill out all fields.");
      return;
    }

    if (Number(formData.amount) <= 0) {
      setError("⚠ Amount must be greater than 0.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/transactions", formData);
      onAdd(res.data);
      setFormData({ amount: "", date: "", description: "", category: "" });
    } catch (error) {
      setError("⚠ Failed to add transaction. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>} {/* ✅ Show error message if any */}
        
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        
        {/* ✅ Category Dropdown */}
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="" disabled>Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}
