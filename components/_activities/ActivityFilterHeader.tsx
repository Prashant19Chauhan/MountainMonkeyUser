import {
  Waves, Mountain, UtensilsCrossed, Map, Camera, Palette, Music, Leaf,
  ChevronLeft, ChevronRight, SlidersHorizontal, ChevronDown
} from 'lucide-react';

const categories = [
  { name: 'Water Sports', icon: <Waves size={20} />, color: 'bg-blue-50 text-blue-600' },
  { name: 'Hiking', icon: <Mountain size={20} />, color: 'bg-green-50 text-green-600' },
  { name: 'Food & Drink', icon: <UtensilsCrossed size={20} />, color: 'bg-orange-50 text-orange-600' },
  { name: 'City Tours', icon: <Map size={20} />, color: 'bg-purple-50 text-purple-600' },
  { name: 'Wildlife', icon: <Camera size={20} />, color: 'bg-yellow-50 text-yellow-600' },
  { name: 'Art & Culture', icon: <Palette size={20} />, color: 'bg-pink-50 text-pink-600' },
  { name: 'Nightlife', icon: <Music size={20} />, color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Wellness', icon: <Leaf size={20} />, color: 'bg-emerald-50 text-emerald-600' },
];

const subFilters = [
  "All Activities", "Family Friendly", "Under $50", "Half Day", "Full Day", "Instant Confirmation", "Free Cancellation"
];

export const ActivityFilterHeader = () => {

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-14 md:pt-20 font-sans">
      <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-900">Top Categories</h2>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
        {categories.slice(0, 5).map((cat) => (
          <div
            key={cat.name}
            className="flex items-center gap-4 p-4 rounded-[1.5rem] border border-gray-100 hover:shadow-md transition-shadow cursor-pointer bg-white group"
          >
            <div className={`p-3 rounded-2xl ${cat.color} group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <span className="font-bold text-sm text-gray-800">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar Section */}
      <div className="flex flex-col lg:flex-row items-center gap-3 sm:gap-4 border-t border-gray-50 pt-5 sm:pt-8">

        {/* Scrollable Sub-filters */}
        <div className="relative flex-1 w-full overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {subFilters.map((filter) => (
              <button
                key={filter}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border text-black`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex items-center gap-1 mt-2">
            <button className="p-1 text-gray-400 hover:text-black"><ChevronLeft size={14} /></button>
            <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gray-400 rounded-full" />
            </div>
            <button className="p-1 text-gray-400 hover:text-black"><ChevronRight size={14} /></button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-800 hover:bg-gray-50 flex-1 lg:flex-none">
            <SlidersHorizontal size={14} />
            Filters
          </button>

          <button className="flex items-center justify-between gap-8 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-800 hover:bg-gray-50 flex-1 lg:flex-none">
            <span className="text-gray-400 font-normal">Sort:</span>
            <div className="flex items-center gap-1">
              Top Rated
              <ChevronDown size={14} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
