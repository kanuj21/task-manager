import Task from '../models/task';

interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    deadline: Date;
    status: 'To Do' | 'In Progress' | 'Completed';
    isExpired: boolean;
  }
// Get all tasks with counts
export const getAllTasks = async (req:any, res:any) => {
  try {
    const tasks = await Task.find();
    
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
  } catch (error) {
    res.status(500).json({ message: " HTTP 500 Internal Server Error" });
  }
};

// Create a task
export const createTask = async (req :any, res : any) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

// Update a task by ID
export const updateTask = async (req : any, res : any) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Bad REquest" });
  }
};

// Delete a task by ID
export const deleteTask = async (req : any, res: any) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Bad REquest"});
  }
};

// Get expired tasks only
export const getExpiredTasks = async (req : any, res:any) => {
  try {
    const expiredTasks = await Task.find({ isExpired: true });
    res.status(200).json(expiredTasks);
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
};
