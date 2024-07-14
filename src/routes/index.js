import { Router } from "express";
import { getAuthCodeController } from "../controllers/AuthController.js";

const router = Router();

router.post("/auth-code", getAuthCodeController);

export default router;
