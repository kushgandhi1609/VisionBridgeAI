
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import visionRoutes from "./routes/vision.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_ORIGIN,
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "online",
    service: "VisionBridge AI",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/vision", visionRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`VisionBridge AI backend running on port ${port}`);
});

