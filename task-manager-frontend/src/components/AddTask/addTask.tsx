


import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createTask, updateTask, Task } from '@/utils/taskAPI';
import SuccessPopup from "./successfullpopup"

interface TaskData {
  _id?: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  description: string;
  deadline: Date | null;
  status: 'To Do' | 'In Progress' | 'Completed';
}

export const AddTaskPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  refreshTasks: () => Promise<void>; 
  editingTask?: TaskData | null;
}> = ({ isOpen, onClose, refreshTasks, editingTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
      setDescription(editingTask.description);
      setDeadline(editingTask.deadline);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle('');
    setPriority('Low');
    setDescription('');
    setDeadline(null);
    setShowCalendar(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !deadline) {
      alert("Please fill in the Task Title and select a Deadline.");
      return;
    }

    const taskData: Task = {
      title,
      description,
      priority,
      deadline: deadline.toISOString(),
      status: editingTask?.status || "To Do",
    };

    try {
      if (editingTask && editingTask._id) {
        await updateTask(editingTask._id, taskData);
      } else {
        await createTask(taskData);
      }
      await refreshTasks();
      resetForm();
      setShowSuccessPopup(true); // ✅ Show success popup first
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task. Please try again.");
    }
  };

  const handleClose = async () => {
    if (showSuccessPopup) {
      console.log("✅ Closing success popup only.");
      setTimeout(() => setShowSuccessPopup(false), 500);
      return;
    }
    console.log("❌ Closing the full dialog.");
    resetForm();
    setShowSuccessPopup(false); // ✅ Reset success state
    onClose();
    await refreshTasks();
  };

  const handleDateSelect = (day: Date | undefined) => {
    setDeadline(day ?? null);
  };

  return (
    <Dialog open={isOpen || showSuccessPopup} onOpenChange={handleClose}>  
      <DialogContent>
        {showSuccessPopup ? (
          <SuccessPopup onClose={handleClose} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {editingTask ? 'Edit Task' : 'Add Task'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Task Title (required)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Select value={priority} onValueChange={(value) => setPriority(value as 'Low' | 'Medium' | 'High')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button variant="outline" onClick={() => setShowCalendar(!showCalendar)}>
                {deadline ? deadline.toLocaleDateString() : 'Select Deadline (required)'}
              </Button>
              {showCalendar && (
                <Calendar mode="single" selected={deadline ?? undefined} onSelect={handleDateSelect} />
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit}>{editingTask ? 'Update' : 'Assign'}</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskPopup;













// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Calendar } from "@/components/ui/calendar";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { MdDone } from "react-icons/md";
// import { createTask, updateTask, Task } from '@/utils/taskAPI'
// import { SuccessPopup } from './successfullpopup';



// interface TaskData {
//   _id?: string;
//   title: string;
//   priority: 'Low' | 'Medium' | 'High';
//   description: string;
//   deadline: Date | null;
//   status: 'To Do' | 'In Progress' | 'Completed';
// }

// export const AddTaskPopup: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   refreshTasks: () => Promise<void>;  // ✅ Added refreshTasks prop
//   editingTask?: TaskData | null;

// }> = ({ isOpen, onClose, refreshTasks, editingTask }) => {
//   const [title, setTitle] = useState('');
//   const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
//   const [description, setDescription] = useState('');
//   const [deadline, setDeadline] = useState<Date | null>(null);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   useEffect(() => {
//     if (editingTask) {
//       setTitle(editingTask.title);
//       setPriority(editingTask.priority);
//       setDescription(editingTask.description);
//       setDeadline(editingTask.deadline);
//     } else {
//       resetForm();
//     }
//   }, [editingTask]);

//   const resetForm = () => {
//     setTitle('');
//     setPriority('Low');
//     setDescription('');
//     setDeadline(null);
//     setShowCalendar(false);
//   };

 

//   const handleSubmit = async () => {
//     if (!title.trim() || !deadline) {
//       alert("Please fill in the Task Title and select a Deadline.");
//       return;
//     }
  
//     const taskData: Task = {
//       title,
//       description,
//       priority,
//       deadline: deadline.toISOString(),
//       status: editingTask?.status || "To Do",
//     };
  
//     try {
//       if (editingTask && editingTask._id) {
//         await updateTask(editingTask._id, taskData);
//       } else {
//         await createTask(taskData);
//       }
//       // console.log("✅ Task saved successfully, showing success popup...");
//       await refreshTasks();
//       resetForm();
//       setShowSuccessPopup(true); // ✅ Show success popup first

//     } catch (error) {
//       console.error("Error saving task:", error);
//       alert("Failed to save task. Please try again.");
//     }
//   };

//   const handleClose = async () => {
//     if (showSuccessPopup) {
//       console.log("✅ Closing success popup only.");
      
//       setTimeout(() => setShowSuccessPopup(false), 500);
//       return;  // ✅ Prevents dialog from closing immediately
//     }
//     console.log("❌ Closing the full dialog.");
//     resetForm();
//     onClose();
//     await refreshTasks();
//   };
  

//   const handleDateSelect = (day: Date | undefined) => {
//     setDeadline(day ?? null);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleClose}>
//       <DialogContent>
//         {showSuccessPopup ? (
//           <SuccessPopup onClose={handleClose} />
//         ) : (
//           <>
//             <DialogHeader>
//               <DialogTitle className="text-xl font-semibold">
//                 {editingTask ? 'Edit Task' : 'Add Task'}
//               </DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4">
//               <Input
//                 placeholder="Task Title (required)"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//               <Select value={priority} onValueChange={(value) => setPriority(value as 'Low' | 'Medium' | 'High')}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Priority" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Low">Low</SelectItem>
//                   <SelectItem value="Medium">Medium</SelectItem>
//                   <SelectItem value="High">High</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Textarea
//                 placeholder="Task Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//               <Button variant="outline" onClick={() => setShowCalendar(!showCalendar)}>
//                 {deadline ? deadline.toLocaleDateString() : 'Select Deadline (required)'}
//               </Button>
//               {showCalendar && (
//                 <Calendar mode="single" selected={deadline ?? undefined} onSelect={handleDateSelect} />
//               )}
//             </div>
//             <DialogFooter>
//               <Button onClick={handleSubmit}>{editingTask ? 'Update' : 'Assign'}</Button>
//             </DialogFooter>
//           </>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddTaskPopup;
