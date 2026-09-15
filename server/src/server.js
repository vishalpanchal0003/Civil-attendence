import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/worker.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import connectDB from "./config/dbConnect.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:3000",
    ]
  })
); app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

const port = process.env.PORT || 4000;

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log("Server listening on PORT", port);
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});
