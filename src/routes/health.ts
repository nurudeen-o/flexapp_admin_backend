import { Router } from "express";
import { getHealthStatus } from "../controllers/health";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getHealthStatus);

export default router;
