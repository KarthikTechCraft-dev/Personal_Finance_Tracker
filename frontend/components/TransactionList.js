"use client";
import { useState } from "react";
import axios from "axios";
import { FaUtensils, FaShoppingCart, FaHome, FaFilm, FaPlane, FaTag, FaEdit, FaTrash } from "react-icons/fa";
import styles from "@/styles/Home.module.css";

// Function to get category icon
const getCategoryIcon = (category) => {
  const icons = {
    Food: <FaUtensils className={styles.categoryIcon} />,
    Shopping: <FaShoppingCart className={styles.categoryIcon} />,
    Bills: <FaHome className={styles.categoryIcon} />,
    Entertainment: <FaFilm className={styles.categoryIcon} />,
    Travel: <FaPlane className={styles.categoryIcon} />,
    Other: <FaTag className={styles.categoryIcon} />,
  };
  return icons[category] || <FaTag className={styles.categoryIcon} />;
};

export default function TransactionList({ transactions, setTransactions }) {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editData, setEditData] = useState({ amount: "", date: "", description: "", category: "" });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      alert("Failed to delete transaction.");
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction._id);
    setEditData({
      amount: transaction.amount,
      date: new Date(transaction.date).toISOString().split("T")[0],
      description: transaction.description,
      category: transaction.category,
    });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/transactions/${editingTransaction}`, editData);
      setTransactions(transactions.map((t) => (t._id === editingTransaction ? res.data : t)));
      setEditingTransaction(null);
    } catch (error) {
      alert("Failed to update transaction.");
    }
  };

  return (
    <div className={styles.transactionList}>
      <h2>Transactions</h2>
      {transactions.map((t) => (
        <div key={t._id} className={styles.transactionCard} data-category={t.category}>
          {editingTransaction === t._id ? (
            <div className={styles.editTransaction}>
              <input type="number" value={editData.amount} onChange={(e) => setEditData({ ...editData, amount: e.target.value })} />
              <input type="date" value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} />
              <input type="text" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
              <input type="text" value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} />
              <div className={styles.transactionActions}>
                <button className={styles.editButton} onClick={handleSave}>Save</button>
                <button className={styles.deleteButton} onClick={() => setEditingTransaction(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.transactionDetails}>
                <div className={styles.categoryIconWrapper}>{getCategoryIcon(t.category)}</div>
                <div className={styles.transactionInfo}>
                  <span className={styles.transactionCategory}>{t.category}</span>
                  <span className={styles.transactionAmount}>${t.amount}</span>
                  <span className={styles.transactionDate}>{new Date(t.date).toLocaleDateString()}</span>
                  <p>{t.description}</p>
                </div>
              </div>
              <div className={styles.transactionActions}>
                <button className={styles.editButton} onClick={() => handleEdit(t)}><FaEdit /></button>
                <button className={styles.deleteButton} onClick={() => handleDelete(t._id)}><FaTrash /></button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
