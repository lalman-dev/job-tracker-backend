import { Router } from "express";
import { authenticate } from "../../auth/middlewares/auth.middleware";
import { getApplicationStatusHistory } from "../controllers/applicationHistory.controllers";

const router = Router();

router.use(authenticate);
router.get("/:id/history", getApplicationStatusHistory);

export default router;
