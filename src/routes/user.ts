import { Router } from "express";
import { getAllUsers, getUserDetails, suspendUser, assignRole } from "../controllers/user";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getUserDetails);
router.post("/:id/suspend", authenticateToken, suspendUser);
router.post("/:id/assign-role", authenticateToken, assignRole);

export default router;
