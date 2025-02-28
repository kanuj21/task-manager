import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, count }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-4 w-full sm:w-48 transition-all">
      <div className="text-purple-600">Icon</div>
      <h3 className="text-lg font-semibold text-gray-700 mt-2 sm:block hidden">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1 sm:block hidden">{count}</p>
    </div>
  );
};

export default DashboardCard;