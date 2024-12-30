import { Request, Response, NextFunction } from "express";
import User from "../models/user";

const excludeSensitiveFields = (user: any) => {
  const { password, ...rest } = user;
  return rest;
};

// Get all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Get user details by ID
export const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      res.status(404).json({ status: "error", message: "User not found" });
      return;
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Suspend user
export const suspendUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ status: "error", message: "User not found" });
      return;
    }

    await user.update({ verification_status: "suspended" });
    res.status(200).json({
      status: "success",
      message: "User suspended successfully",
      data: excludeSensitiveFields(user.get()),
    });
  } catch (error) {
    next(error);
  }
};

// Assign role to user
export const assignRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      res.status(400).json({ status: "error", message: "Role is required" });
      return;
    }

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ status: "error", message: "User not found" });
      return;
    }

    await user.update({ verification_status: role });
    res.status(200).json({
      status: "success",
      message: "Role assigned successfully",
      data: excludeSensitiveFields(user.get()),
    });
  } catch (error) {
    next(error);
  }
};
