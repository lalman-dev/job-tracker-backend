import { Router } from "express";
import { authenticate } from "../../auth/middlewares/auth.middleware.js";
import { getApplicationStatusHistory } from "../controllers/applicationHistory.controllers.js";

const router = Router();

router.use(authenticate);
router.get("/:id/history", getApplicationStatusHistory);

export default router;
