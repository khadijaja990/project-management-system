import express from "express";
import {
  getProjects,
  createProject,
} from "../controllers/projectController";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Protected project routes
router.get(
  "/",
  protect,
  getProjects
);

router.post(
  "/",
  protect,
  createProject
);

export default router;