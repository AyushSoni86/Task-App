import { Router } from "express";
import * as tasksController from "../controllers/tasksController.js";

const router = Router();

router.get("/", tasksController.getTasks);
router.post("/", tasksController.createTask);
router.patch("/:id/status", tasksController.updateTaskStatus);

export default router;
