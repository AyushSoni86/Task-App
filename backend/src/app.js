import express from "express";
import cors from "cors";

import tasksRoutes from "./routes/tasksRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/tasks", authMiddleware, tasksRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
