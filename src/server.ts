import "dotenv/config";
import app from "./app";
import { connectDB } from "./configs/db";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is listening on Port:${PORT}`);
  });
};
startServer();
