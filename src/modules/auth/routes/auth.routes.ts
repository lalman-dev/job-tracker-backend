import { Router } from "express";
import { login, register } from "../controllers/auth.controllers.js";
import { validate } from "../../../utils/validate.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
