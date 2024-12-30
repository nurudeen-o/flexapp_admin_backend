import { Request, Response, NextFunction } from "express";
import Admin from "../models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/auth";

export const registerAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, avatar, role } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400).json({ error: "All required fields must be provided (name, email, password, role)." });
      return;
    }

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      res.status(409).json({ error: "Admin with this email already exists." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      avatar: avatar || null,
      role,
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: { id: newAdmin.id, name: newAdmin.name, email: newAdmin.email, role: newAdmin.role },
    });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role } as AuthPayload,
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
      token,
    });
  } catch (error) {
    next(error);
  }
};

