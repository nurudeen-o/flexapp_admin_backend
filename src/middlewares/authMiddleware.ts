import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "flexapp_blochain_key";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-authorization-token"] as string;

  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token.",
    });
  }
};
