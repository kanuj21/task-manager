import React from 'react';

interface CategoryColumnProps {
  title: string;
  count: number;
  lineColor: string;
  children?: React.ReactNode;
}

const CategoryColumn: React.FC<CategoryColumnProps> = ({ title, count, lineColor, children }) => {
  return (
    <div className="flex flex-col w-full bg-gray-200 rounded-2xl shadow-md p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-200 text-gray-700 text-sm font-medium">
          {count}
        </div>
      </div>
      <div className={`h-1 w-full rounded-full mt-2 ${lineColor}`} />
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </div>
  );
};

export default CategoryColumn;
