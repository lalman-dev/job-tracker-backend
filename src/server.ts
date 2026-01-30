import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./configs/db.js";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is listening on Port:${PORT}`);
  });
};
startServer();
