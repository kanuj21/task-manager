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
exports.handleTaskTimeouts = void 0;
const task_1 = __importDefault(require("../models/task"));
/**
 * Periodically checks for tasks that exceed their duration
 * and moves them to the "Timeout" category automatically.
 */
const handleTaskTimeouts = () => {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const tasks = yield task_1.default.find();
        const now = new Date().getTime();
        for (const task of tasks) {
            const elapsedMinutes = (now - new Date(task.createdAt).getTime()) / 60000;
            // Safely handle nullable duration
            if (((_a = task.duration) !== null && _a !== void 0 ? _a : 0) > 0 && elapsedMinutes > task.duration) {
                task.category = 'Timeout';
                yield task.save();
                console.log(`Task "${task.title}" moved to Timeout due to exceeded duration.`);
            }
        }
    }), 60000); // Runs every minute
};
exports.handleTaskTimeouts = handleTaskTimeouts;
