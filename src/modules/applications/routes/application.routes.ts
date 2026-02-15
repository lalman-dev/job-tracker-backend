import { Router } from "express";
import {
  createApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/application.controllers";
import { authenticate } from "../../auth/middlewares/auth.middleware";
import { validate } from "../../../utils/validate";
import {
  createApplicationSchema,
  updateApplicationStatusSchema,
} from "../validations/application.validation";

const router = Router();

router.use(authenticate);

router.post("/", createApplication);
router.get("/", getApplications);
router.patch("/:id/status", updateApplicationStatus);
router.delete("/:id", deleteApplication);
router.post("/", validate(createApplicationSchema), createApplication);
router.patch(
  "/:id/status",
  validate(updateApplicationStatusSchema),
  updateApplicationStatus,
);

export default router;
