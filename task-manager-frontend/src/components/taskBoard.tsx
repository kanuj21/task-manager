'use client';

import React from 'react';
import CategoryColumn from './categoryColumn';
import TaskItem from './taskItems';
import { updateTask, deleteTask, Task } from '@/utils/taskAPI';
import { useState } from 'react';

interface TaskBoardProps {
  tasks: Task[]; // Receive tasks from parent (page.tsx)
  refreshTasks: () => void; // Function to refresh tasks
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, refreshTasks }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Handle task editing
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsPopupOpen(true);
  };

  // Handler for deleting a task
  const handleDelete = async (id: any) => {
    try {
      await deleteTask(id);
      refreshTasks(); // Refresh the task list after deletion
    } catch (error) {
      console.error(`Failed to delete task ${id}:`, error);
    }
  };

  // Handler for updating task status
  const handleStatusUpdate = async (id: any, newStatus: 'In Progress' | 'Completed') => {
    try {
      const updatedTask = await updateTask(id, { status: newStatus });
      if (!updatedTask) {
        throw new Error('Failed to update task');
      }
      refreshTasks(); // Refresh the task list after status update
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
    }
  };

  // Filter tasks based on status
  const getTasksByStatus = (status: Task['status']) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-[1080px]">
        {/* To Do Section */}
        <CategoryColumn title="To Do" count={getTasksByStatus('To Do').length} lineColor="bg-blue-500">
          {getTasksByStatus('To Do').map((task) => (
            <TaskItem
              key={task._id}
              _id={task._id}
              title={task.title}
              deadline={task.deadline}
              description={task.description}
              priority={task.priority}
              status='To Do'
              onEdit={() => handleEdit(task)}
              refreshTasks={async () => refreshTasks()}
              onDelete={() => handleDelete(task._id)}
              onUpdateStatus={() => handleStatusUpdate(task._id, 'In Progress')}
              
            />
          ))}
        </CategoryColumn>

        {/* In Progress Section */}
        <CategoryColumn title="In Progress" count={getTasksByStatus('In Progress').length} lineColor="bg-yellow-500">
          {getTasksByStatus('In Progress').map((task) => (
            <TaskItem
              key={task._id}
              _id={task._id}
              title={task.title}
              deadline={task.deadline}
              description={task.description}
              priority={task.priority}
              status='In Progress'
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task._id)}
              refreshTasks={async () => refreshTasks()}
              onUpdateStatus={() => handleStatusUpdate(task._id, 'Completed')}
            />
          ))}
        </CategoryColumn>

        {/* Completed Section */}
        <CategoryColumn title="Completed" count={getTasksByStatus('Completed').length} lineColor="bg-green-500">
          {getTasksByStatus('Completed').map((task) => (
            <div key={task._id} className="p-3 bg-gray-100 rounded-lg shadow-sm text-gray-700 line-through">
              {task.title}
            </div>
          ))}
        </CategoryColumn>
      </div>
    </div>
  );
};

export default TaskBoard;




{/* <TaskItem
              key={task._id}
              _id={task._id}
              title={task.title}
              deadline={task.deadline}
              description={task.description}
              priority={task.priority}
              status='In Progress'
              onEdit={() => handleEdit(task)}
              onDelete={handleDelete}
              onUpdateStatus={() => handleStatusUpdate(task._id, 'Completed')}
            /> */}