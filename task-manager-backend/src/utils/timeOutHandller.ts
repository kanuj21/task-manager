import Task from '../models/task';

/**
 * Periodically checks for tasks that exceed their duration
 * and moves them to the "Timeout" category automatically.
 */
export const handleTaskTimeouts = () => {
  setInterval(async () => {
    const tasks = await Task.find();
    const now = new Date().getTime();

    for (const task of tasks) {
        const elapsedMinutes = (now - new Date(task.createdAt).getTime()) / 60000;
        
        // Safely handle nullable duration
        if ((task.duration ?? 0) > 0 && elapsedMinutes > task.duration!) {
          task.category = 'Timeout';
          await task.save();
          console.log(`Task "${task.title}" moved to Timeout due to exceeded duration.`);
        }
      }
      
  }, 60000); // Runs every minute
};
