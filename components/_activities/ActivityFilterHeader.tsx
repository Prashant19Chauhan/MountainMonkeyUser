"use client";

import React from 'react';
import {
  Waves, Mountain, UtensilsCrossed, Map, Camera, Palette, Music, Leaf,
  ChevronLeft, ChevronRight, SlidersHorizontal, ChevronDown
} from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category') || '';
  const activeSubFilter = searchParams.get('subFilter') || '';
  const sort = searchParams.get('sort') || 'rating';
  const query = searchParams.get('query') || '';

  const handleCategoryChange = (catName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeCategory.toLowerCase() === catName.toLowerCase()) {
      params.delete('category');
    } else {
      params.set('category', catName);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSubFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeSubFilter.toLowerCase() === filter.toLowerCase() || filter === 'All Activities') {
      params.delete('subFilter');
    } else {
      params.set('subFilter', filter);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

  let activeFiltersCount = 0;
  if (activeCategory) activeFiltersCount++;
  if (activeSubFilter) activeFiltersCount++;
  if (query) activeFiltersCount++;

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-14 md:pt-20 font-sans">
      <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-900">Top Categories</h2>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
        {categories.slice(0, 5).map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.name.toLowerCase();
          return (
            <div
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={`flex items-center gap-4 p-4 rounded-[1.5rem] border hover:shadow-md transition-all cursor-pointer bg-white group ${
                isActive
                  ? 'border-rose-500 shadow-md shadow-rose-50/50 scale-[1.02]'
                  : 'border-gray-100'
              }`}
            >
              <div className={`p-3 rounded-2xl ${isActive ? 'bg-rose-500 text-white' : cat.color} group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className={`font-bold text-sm ${isActive ? 'text-rose-600' : 'text-gray-800'}`}>{cat.name}</span>
            </div>
          );
        })}
      </div>

      {/* Filter Bar Section */}
      <div className="flex flex-col lg:flex-row items-center gap-3 sm:gap-4 border-t border-gray-50 pt-5 sm:pt-8">

        {/* Scrollable Sub-filters */}
        <div className="relative flex-1 w-full overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {subFilters.map((filter) => {
              const isActive = (filter === 'All Activities' && !activeSubFilter) || activeSubFilter.toLowerCase() === filter.toLowerCase();
              return (
                <button
                  key={filter}
                  onClick={() => handleSubFilterChange(filter)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-gray-600'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Scroll Indicators */}
          <div className="flex items-center gap-1 mt-2">
            <button className="p-1 text-gray-400 hover:text-black bg-transparent border-0"><ChevronLeft size={14} /></button>
            <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gray-400 rounded-full" />
            </div>
            <button className="p-1 text-gray-400 hover:text-black bg-transparent border-0"><ChevronRight size={14} /></button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-100 transition-all cursor-pointer flex-1 lg:flex-none"
            >
              <SlidersHorizontal size={14} />
              Reset ({activeFiltersCount})
            </button>
          )}

          <div className="flex items-center justify-between gap-8 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-800 hover:bg-gray-50 flex-1 lg:flex-none relative pr-8">
            <span className="text-gray-400 font-normal">Sort:</span>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent border-0 outline-none text-xs font-bold text-gray-900 focus:ring-0 cursor-pointer appearance-none p-0 pr-4"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23111827' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
              }}
            >
              <option value="rating">Top Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
