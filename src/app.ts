import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import healthRoutes from "./routes/health";
import transactionRoutes from "./routes/transactions";
import adsRoutes from "./routes/ads";

import { sequelize } from "./config/database";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin/auth", authRoutes);
app.use("/api/admin/users", userRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/ads", adsRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Admin Panel API!");
});

// Error Handling Middleware
app.use(errorHandler);

// Database connection and server start
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err.message);
  });
