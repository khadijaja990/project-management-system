import express from "express";

import {
getProjects,
createProject,
updateProject,
deleteProject,
} from "../controllers/projectController";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Get all projects
router.get(
"/",
protect,
getProjects
);

// Create project
router.post(
"/",
protect,
createProject
);

// Update project
router.put(
"/:id",
protect,
updateProject
);

// Delete project
router.delete(
"/:id",
protect,
deleteProject
);

export default router;
