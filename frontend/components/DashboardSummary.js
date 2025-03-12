"use client";
import styles from "@/styles/Home.module.css";

export default function DashboardSummary({ transactions }) {
  // ✅ Calculate Total Expenses
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

  // ✅ Get Last 5 Transactions
  const recentTransactions = transactions.slice(-5).reverse(); 

  return (
    <div className={styles.dashboardSummary}>
      {/* ✅ Total Expenses */}
      <div className={styles.summaryCard}>
        <h3>Total Expenses</h3>
        <p className={styles.totalAmount}>${totalExpenses.toFixed(2)}</p>
      </div>

      {/* ✅ Recent Transactions */}
      <div className={styles.summaryCard}>
        <h3>Recent Transactions</h3>
        <ul className={styles.recentTransactions}>
          {recentTransactions.map((t) => (
            <li key={t._id}>
              <span>{t.description}</span>
              <span>${t.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
