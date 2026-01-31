import { Router } from "express";
import {
  createApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/application.controllers.js";
import { authenticate } from "../../auth/middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", createApplication);
router.get("/", getApplications);
router.patch("/:id/status", updateApplicationStatus);
router.delete("/:id", deleteApplication);

export default router;
