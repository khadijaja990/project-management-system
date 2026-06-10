import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

import { pool } from "./config/db";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());

// Database Connection Test
pool
  .query("SELECT NOW()")
  .then((result) => {
    console.log("✅ Database Connected");
    console.log(result.rows[0]);
  })
  .catch((err) => {
    console.error("❌ Database Error");
    console.error(err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Project Management System API Running 🚀",
  });
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});