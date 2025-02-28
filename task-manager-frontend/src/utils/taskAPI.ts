const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || 'https://task-manager-backend-ruddy-six.vercel.app/tasks';//'http://localhost:5000/tasks';//

// Task interface for type safety
export interface Task {
  _id?: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  deadline: string;
  status?: 'To Do' | 'In Progress' | 'Completed';
}

// Helper function for Fetch API
const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return (await res.json()) as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Get all tasks
export const getAllTasks = async (): Promise<{ tasks: Task[] }> =>
  request<{ tasks: Task[] }>(BASE_URL);



// Create a new task
export const createTask = async (taskData: Task): Promise<Task> =>
  request<Task>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(taskData),
  });

// Update a task by ID
export const updateTask = async (id: string, updatedData: Partial<Task>): Promise<Task> =>
  request<Task>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedData),
  });

// Delete a task by ID
export const deleteTask = async (id: string): Promise<{ message: string }> =>
  request<{ message: string }>(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

// Update task status (To Do, In Progress, Completed)
export const updateTaskStatus = async (id: string, status: Task['status']): Promise<Task> =>
  request<Task>(`${BASE_URL}/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });

  
