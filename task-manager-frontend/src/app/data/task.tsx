import { Task } from '@/components/taskBoard';

const tasksData: Task[] = [
  {
    id: '1',
    title: 'Design Dashboard UI',
    description: 'Create a responsive dashboard design with proper color themes and accessibility features.',
    priority: 'High',
    deadline: '2025-03-05',
    status: 'todo',
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Set up JWT-based authentication for secure login and registration with form validation.',
    priority: 'Medium',
    deadline: '2025-03-10',
    status: 'inprogress',
  },
  {
    id: '3',
    title: 'Fix API Integration Bugs',
    description: 'Resolve issues related to API response handling and ensure proper error messages are displayed.',
    priority: 'High',
    deadline: '2025-03-02',
    status: 'inprogress',
  },
  {
    id: '4',
    title: 'Write Unit Tests',
    description: 'Write comprehensive unit tests for all major components using Jest and React Testing Library.',
    priority: 'Low',
    deadline: '2025-03-15',
    status: 'completed',
  },
  {
    id: '5',
    title: 'Optimize Database Queries',
    description: 'Optimize MongoDB queries for faster response times and reduce database load.',
    priority: 'Medium',
    deadline: '2025-03-07',
    status: 'todo',
  },
  {
    id: '6',
    title: 'Deploy Backend API',
    description: 'Deploy backend services on Render with proper environment configurations and logging.',
    priority: 'High',
    deadline: '2025-03-03',
    status: 'completed',
  },
  {
    id: '7',
    title: 'Add Pagination to Task List',
    description: 'Implement pagination for the task list component to improve load times for large data sets.',
    priority: 'Low',
    deadline: '2025-03-12',
    status: 'todo',
  },
];
export default tasksData;