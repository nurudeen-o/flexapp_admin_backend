import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/auth";

const router: Router = Router();

router.post("/add", registerAdmin);
router.post("/", loginAdmin);

export default router;
