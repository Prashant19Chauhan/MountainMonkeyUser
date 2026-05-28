import React from 'react';
import { 
  Waves, Umbrella, Castle, Tent, Home, Palmtree, Trees, Snowflake, Anchor, 
  SlidersHorizontal 
} from 'lucide-react';

const categories = [
  { id: 'pools', label: 'Amazing pools', icon: <Waves size={28} /> },
  { id: 'beach', label: 'Beachfront', icon: <Umbrella size={28} /> },
  { id: 'castles', label: 'Castles', icon: <Castle size={28} /> },
  { id: 'cabins', label: 'Cabins', icon: <Tent size={28} /> },
  { id: 'mansions', label: 'Mansions', icon: <Home size={28} /> },
  { id: 'islands', label: 'Islands', icon: <Palmtree size={28} /> },
  { id: 'treehouses', label: 'Treehouses', icon: <Trees size={28} /> },
  { id: 'skiing', label: 'Skiing', icon: <Snowflake size={28} /> },
  { id: 'lake', label: 'Lakefront', icon: <Anchor size={24} /> },
];

export const StayFilterHeader = () => {

  return (
    <div className="pt-8 sm:pt-14 md:pt-20 px-3 sm:px-4 md:px-20 font-sans">
      <div className="w-full mx-auto px-2 sm:px-4 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Category Icons List Selector */}
        <div className="flex items-center gap-5 sm:gap-8 overflow-x-auto no-scrollbar flex-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={'flex flex-col items-center gap-1 sm:gap-2 min-w-fit transition-all border-b-2 pb-2 group border-transparent text-gray-500 hover:text-black hover:border-gray-200'}
            >
              <div className={`transition-transform group-active:scale-95 opacity-100 scale-75 sm:scale-100`}>
                {cat.icon}
              </div>
              <span className={`text-[11px] sm:text-[15px] font-bold whitespace-nowrap text-black`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* Filter Trigger Button */}
        <div className="flex items-center pl-2 sm:pl-4 border-l border-gray-100 h-10 sm:h-12 shrink-0">
          <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-white">
            <SlidersHorizontal size={14} className="text-gray-900" />
            <span className="text-xs font-bold text-gray-900 hidden sm:inline">Filters</span>
          </button>
        </div>

      </div>
    </div>
  );
};
