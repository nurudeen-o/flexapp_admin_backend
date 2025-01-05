import { Request, Response, NextFunction } from "express";
import { Transaction } from "../models/transactions";
import User from "../models/user";

// Fetch all transactions
export const getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: User, as: "buyer", attributes: ["full_name", "address", "nationality"] },
        { model: User, as: "seller", attributes: ["full_name", "address", "nationality"] },
      ],
    });
    
    res.status(200).json({
      status: "success",
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

// Fetch a single transaction
export const getTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      where: { id },
      include: [
        { model: User, as: "buyer", attributes: ["full_name", "address", "nationality"] },
        { model: User, as: "seller", attributes: ["full_name", "address", "nationality"] },
      ],
    });

    if (!transaction) {
      return res.status(404).json({ status: "error", message: "Transaction not found" });
    }

    res.status(200).json({
      status: "success",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// Update a transaction
export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ status: "error", message: "Transaction not found" });
    }

    await transaction.update(updatedFields);

    res.status(200).json({
      status: "success",
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a transaction
export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ status: "error", message: "Transaction not found" });
    }

    await transaction.destroy();

    res.status(200).json({
      status: "success",
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
