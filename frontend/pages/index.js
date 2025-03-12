import { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";
import DashboardSummary from "../components/DashboardSummary";
import BudgetTracker from "../components/BudgetTracker";
import styles from "@/styles/Home.module.css"; // ✅ Import CSS

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personal Finance Visualizer</h1>
      
      {/* ✅ Dashboard Summary Section */}
      <DashboardSummary transactions={transactions} />
      
      {/* ✅ Budget Tracker Section */}
      <BudgetTracker transactions={transactions} />
      
      {/* ✅ Transaction Form */}
      <TransactionForm onAdd={(t) => setTransactions([...transactions, t])} />
      
      {/* ✅ Transaction List */}
      <TransactionList transactions={transactions} setTransactions={setTransactions} />
      
      {/* ✅ Expense Chart */}
      <ExpenseChart transactions={transactions} />
    </div>
  );
}
