import { Router } from "express";
import { getAllTransactions, getTransaction, updateTransaction, deleteTransaction } from "../controllers/transactions";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Fetch all transactions
router.get("/", authenticateToken, getAllTransactions);
// Fetch a single transaction
router.get("/:id", authenticateToken, getTransaction);
// Update a transaction
router.post("/:id", authenticateToken, updateTransaction);
// Delete a transaction
router.delete("/:id", authenticateToken, deleteTransaction);

export default router;
