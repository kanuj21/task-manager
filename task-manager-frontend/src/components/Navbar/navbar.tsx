import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center p-4 bg-gray-100">
      <div className="flex items-center justify-between w-full max-w-4xl bg-white rounded-2xl shadow-lg p-4">
        {/* 🔍 Search Box */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
          <Search className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* 🎛 Filter Button */}
        <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5 py-2 shadow">
          <Filter className="w-5 h-5" />
          <span>Filter</span>
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
}
