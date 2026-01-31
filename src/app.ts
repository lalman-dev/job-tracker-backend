import express from "express";
import authRoutes from "./modules/auth/routes/auth.routes.js";
import { authenticate } from "./modules/auth/middlewares/auth.middleware.js";
import applicationRoutes from "./modules/applications/routes/application.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});
app.use("/auth", authRoutes);

app.get("/me", authenticate, (req, res) => {
  res.json({ userId: req.userId });
});

app.use("/applications", applicationRoutes);
export default app;
