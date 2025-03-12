import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Add a transaction
router.post("/", async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    const transaction = new Transaction({ amount, date, description, category });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

// Edit a transaction (Update)
router.put("/:id", async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, date, description, category },
      { new: true }
    );
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

export default router;
