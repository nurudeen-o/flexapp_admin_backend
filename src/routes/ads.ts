import { Router } from "express";
import { getAllAds, getAdById, createAd, updateAd, deleteAd } from "../controllers/ads";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getAllAds);
router.get("/:id", authenticateToken, getAdById);
// router.post("/", createAd);
router.post("/:id", authenticateToken, updateAd);
router.delete("/:id", authenticateToken, deleteAd);

export default router;
