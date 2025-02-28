"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpiredTasks = exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTasks = void 0;
const task_1 = __importDefault(require("../models/task"));
// Get all tasks with counts
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_1.default.find();
        // const expiredTasks = tasks.filter((task: Task) => task.isExpired);
        // const completedTasks = tasks.filter((task:Task) => task.status === 'Completed');
        // const inProgressTasks = tasks.filter((task : Task) => task.status === 'In Progress');
        // const toDoTasks = tasks.filter((task:Task) => task.status === 'To Do');
        res.status(200).json({
            // totalTasks: tasks.length,
            // expiredCount: expiredTasks.length,
            // completedCount: completedTasks.length,
            // inProgressCount: inProgressTasks.length,
            // toDoCount: toDoTasks.length,
            tasks,
        });
    }
    catch (error) {
        res.status(500).json({ message: " HTTP 500 Internal Server Error" });
    }
});
exports.getAllTasks = getAllTasks;
// Create a task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_1.default.create(req.body);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json({ message: "Bad Request" });
    }
});
exports.createTask = createTask;
// Update a task by ID
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedTask = yield task_1.default.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedTask)
            return res.status(404).json({ message: "Task not found" });
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(400).json({ message: "Bad REquest" });
    }
});
exports.updateTask = updateTask;
// Delete a task by ID
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTask = yield task_1.default.findByIdAndDelete(id);
        if (!deletedTask)
            return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Bad REquest" });
    }
});
exports.deleteTask = deleteTask;
// Get expired tasks only
const getExpiredTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expiredTasks = yield task_1.default.find({ isExpired: true });
        res.status(200).json(expiredTasks);
    }
    catch (error) {
        res.status(500).json({ message: "Bad Request" });
    }
});
exports.getExpiredTasks = getExpiredTasks;
