import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MdMoreVert } from "react-icons/md";
import { format } from 'date-fns';
import AddTaskPopup from "./AddTask/addTask";
import { Task } from '@/utils/taskAPI';

interface TaskItemProps {
  _id?: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  deadline: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onUpdateStatus?: (id: string, newStatus: 'In Progress' | 'Completed') => void;
  refreshTasks: () => Promise<void>;
}

const priorityColors: Record<string, string> = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700',
};

const TaskItem: React.FC<TaskItemProps> = ({
  _id,
  title,
  description,
  priority,
  deadline,
  status,
  onEdit,
  onDelete,
  onUpdateStatus,
  refreshTasks,
}) => {
  const [showEditPopup, setShowEditPopup] = useState(false);

  // ✅ Handle status change
  const handleStatusChange = (newStatus: 'In Progress' | 'Completed') => {
    if (status !== newStatus && onUpdateStatus) {
      onUpdateStatus(_id!, newStatus);
    }
  };

  // ✅ Prepare task for editing and open popup
  const handleEditTask = () => {
    setShowEditPopup(true);
  };

  // ✅ Ensure task updates correctly
  const handleUpdateTask = (updatedTask: Task) => {
    onEdit({ ...updatedTask, _id });
    setShowEditPopup(false); // Close popup after update
  };
  const handleTaskAction = async () => {
    setShowEditPopup(false);
    setShowEditPopup(false);
    await refreshTasks();  // ✅ Refresh tasks after adding/updating
  };
  
  return (
    <div className="relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className={`absolute top-3 left-3 px-2 py-1 text-xs rounded-md ${priorityColors[priority]}`}>
        {priority}
      </div>

      <div className="absolute top-3 right-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MdMoreVert className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleEditTask}>✏️ Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(_id!)} className="text-red-600">🗑 Delete</DropdownMenuItem>
            {status !== 'In Progress' && (
              <DropdownMenuItem onClick={() => handleStatusChange('In Progress')}>
                🚀 Mark as In Progress
              </DropdownMenuItem>
            )}
            {status !== 'Completed' && (
              <DropdownMenuItem onClick={() => handleStatusChange('Completed')}>
                ✅ Mark as Completed
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

      <div className="mt-4 text-right text-sm text-gray-500">
        Deadline: <span className="font-medium">{format(new Date(deadline), 'dd/MM/yyyy')}</span>
      </div>

      {/* ✅ Edit Task Popup - Now correctly updates instead of adding */}
      {showEditPopup && (
        <AddTaskPopup
          isOpen={showEditPopup}
          onClose={() => setShowEditPopup(false)}
          // onAdd={() => {}} // ✅ No longer used for updates
          // onUpdate={handleUpdateTask} // ✅ Now correctly updates
          refreshTasks={handleTaskAction}
          editingTask={{ _id, title, priority, description, status, deadline: new Date(deadline) }}
        />
      )}
    </div>
  );
};

export default TaskItem;
