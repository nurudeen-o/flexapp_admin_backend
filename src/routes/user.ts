import { Router } from "express";
import { getAllUsers, getUserDetails, suspendUser, assignRole, updateKyc } from "../controllers/user";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getUserDetails);
router.post("/:id/suspend", authenticateToken, suspendUser);
router.post("/:id/assign-role", authenticateToken, assignRole);
router.post("/:id/update-kyc/:val", authenticateToken, updateKyc);

export default router;
