import express from "express";
import { getAllTasks, createTask, updateTask, deleteTask, getExpiredTasks } from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", getAllTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.get("/tasks/expired", getExpiredTasks);  // Extra route for expired tasks



export default router;
