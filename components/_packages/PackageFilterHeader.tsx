import React from 'react';
import { 
  Clock, Plane, Star, ChevronDown, SlidersHorizontal, 
  Wallet, Mountain, Palmtree, Church, Users, Heart 
} from 'lucide-react';

const dropdownFilters = [
  { label: 'Budget', icon: <Wallet size={14} /> },
  { label: 'Duration', icon: <Clock size={14} /> },
  { label: 'Rating', icon: <Star size={14} /> },
];

const themes = [
  { label: 'Adventure', icon: <Mountain size={14} /> },
  { label: 'Relaxation', icon: <Palmtree size={14} /> },
  { label: 'Cultural', icon: <Church size={14} /> },
  { label: 'Family', icon: <Users size={14} /> },
  { label: 'Romantic', icon: <Heart size={14} /> },
];

export const PackageFilterHeader = () => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-14 md:pt-20 font-sans">
      {/* Top Filter Row */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-8 overflow-x-auto no-scrollbar">
        {dropdownFilters.map((filter) => (
          <button
            key={filter.label}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-400">{filter.icon}</span>
            {filter.label}
            <ChevronDown size={14} className="text-gray-400" />
          </button>
        ))}

        {/* Highlighted "Includes Flights" Filter */}
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-blue-600">
          <Plane size={14} className="rotate-45" />
          Includes Flights
        </button>

        <div className="h-6 w-[1px] bg-gray-200 mx-1 hidden md:block" />

        {/* All Filters Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold shadow-lg shadow-gray-200">
          <SlidersHorizontal size={14} />
          All Filters (3)
        </button>
      </div>

      {/* Theme & Sort Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-4">
        {/* Theme Icons */}
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {themes.map((theme) => (
            <button
              key={theme.label}
              className={'flex items-center gap-2 whitespace-nowrap pb-1 transition-all border-b-2 border-transparent text-gray-400 hover:text-gray-600'}
            >
              <span className={'text-gray-300'}>
                {theme.icon}
              </span>
              <span className="text-xs font-medium">{theme.label}</span>
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto cursor-pointer group">
          <span className="text-xs text-gray-400">Sort by:</span>
          <div className="flex items-center gap-1 text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            Recommended
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};
