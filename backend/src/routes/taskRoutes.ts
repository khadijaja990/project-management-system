import express from "express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Get tasks
router.get(
  "/",
  protect,
  getTasks
);

// Create task
router.post(
  "/",
  protect,
  createTask
);

// Update task
router.put(
  "/:id",
  protect,
  updateTask
);

// Delete task
router.delete(
  "/:id",
  protect,
  deleteTask
);

export default router;