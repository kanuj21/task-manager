'use client'
import Image from "next/image";
import Navbar from "@/components/Navbar/navbar"
import Dashboard from "@/components/Sidebar/taskStatus"
import TaskBoard from "@/components/taskBoard";
import { getAllTasks, Task} from '@/utils/taskAPI';
import { useState, useEffect } from "react";



export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      console.log('Fetched data:', data);
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <main className="top-0 w-full flex flex-col gap-8 row-start-2 items-center sm:items-start"> */}
      <Navbar/>
      <div className="flex flex-col md:flex-row items-start justify-start gap-6">
        <Dashboard refreshTasks={fetchTasks}/>
        <div className="flex flex-row w-full">
        <TaskBoard tasks={tasks} refreshTasks={fetchTasks} />
        </div>
        
      </div>
      {/* </main> */}
    </div>
  );
}
