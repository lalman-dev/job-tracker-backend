import express from "express";
import authRoutes from "./modules/auth/routes/auth.routes";
import { authenticate } from "./modules/auth/middlewares/auth.middleware";
import applicationRoutes from "./modules/applications/routes/application.routes";
import applicationHistoryRoutes from "./modules/applications/routes/applicationHistory.routes";
import { errorHandler } from "./middlewares/error.middleware";

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

app.use("/applications", applicationHistoryRoutes);

app.use(errorHandler);

export default app;
