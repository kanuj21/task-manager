'use client'
import React, { useState } from 'react';
import DashboardCard from './taskCardShow';
import { AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineWarning } from 'react-icons/ai';
import { Button } from '../ui/button';
import AddTaskPopup from '../AddTask/addTask';

interface TaskCounts {
  completed: number;
  active: number;
  expired: number;
}

const Dashboard: React.FC<{ refreshTasks: () => Promise<void> }> = ({ refreshTasks }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTaskAction = async () => {
    setIsPopupOpen(false);
    await refreshTasks();  // ✅ Refresh tasks after adding/updating
  };

  return (
    <aside className="flex flex-col gap-4 w-20 sm:w-64 p-4 bg-gray-100 rounded-2xl shadow-lg">
      <DashboardCard
        icon={<AiOutlineCheckCircle className="w-8 h-8 text-green-500" />}
        title="Completed Tasks"
        count={8} // {taskCounts.completed}
      />
      <DashboardCard
        icon={<AiOutlineClockCircle className="w-8 h-8 text-blue-500" />}
        title="Active Tasks"
        count={2} // {taskCounts.active}
      />
      <DashboardCard
        icon={<AiOutlineWarning className="w-8 h-8 text-red-500" />}
        title="Expired Tasks"
        count={5} // {taskCounts.expired}
      />
      <Button
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5 py-2 shadow"
        onClick={() => setIsPopupOpen(true)}
      >
        Add Task
      </Button>
      <AddTaskPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        refreshTasks={handleTaskAction}  // ✅ Ensuring refresh after task action
      />
    </aside>
  );
};

export default Dashboard;
