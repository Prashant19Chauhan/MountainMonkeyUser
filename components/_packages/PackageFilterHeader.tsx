"use client";

import React from 'react';
import {
  Clock, Plane, Star, ChevronDown, SlidersHorizontal,
  Wallet, Mountain, Palmtree, Church, Users, Heart
} from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const themes = [
  { label: 'Adventure', icon: <Mountain size={14} /> },
  { label: 'Relaxation', icon: <Palmtree size={14} /> },
  { label: 'Cultural', icon: <Church size={14} /> },
  { label: 'Family', icon: <Users size={14} /> },
  { label: 'Romantic', icon: <Heart size={14} /> },
];

export const PackageFilterHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category') || '';
  const activeBudget = searchParams.get('budget') || '';
  const activeDurationRange = searchParams.get('durationRange') || '';
  const activeRating = searchParams.get('rating') || '';
  const flightsActive = searchParams.get('flights') === 'true';
  const sort = searchParams.get('sort') || 'recommended';

  const handleBudgetChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set('budget', val);
    else params.delete('budget');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDurationRangeChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set('durationRange', val);
    else params.delete('durationRange');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRatingChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set('rating', val);
    else params.delete('rating');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFlightsClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (flightsActive) params.delete('flights');
    else params.set('flights', 'true');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleThemeClick = (themeLabel: string) => {
    const nextCategory = activeCategory.toLowerCase() === themeLabel.toLowerCase() ? '' : themeLabel;
    const params = new URLSearchParams(searchParams.toString());
    if (nextCategory) params.set('category', nextCategory);
    else params.delete('category');
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

  // Count active filters
  let activeFilterCount = 0;
  if (activeCategory) activeFilterCount++;
  if (activeBudget) activeFilterCount++;
  if (activeDurationRange) activeFilterCount++;
  if (activeRating) activeFilterCount++;
  if (flightsActive) activeFilterCount++;
  if (searchParams.get('query')) activeFilterCount++;

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-14 md:pt-20 font-sans">
      {/* Top Filter Row */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-8 overflow-x-auto no-scrollbar">
        {/* Budget select */}
        <div className="relative shrink-0">
          <select
            value={activeBudget}
            onChange={(e) => handleBudgetChange(e.target.value)}
            className="flex items-center gap-2 pl-8 pr-7 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-800 hover:bg-gray-50 transition-colors appearance-none cursor-pointer focus:ring-0 focus:outline-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
            }}
          >
            <option value="">Budget: All</option>
            <option value="low">Under $1,500</option>
            <option value="mid">$1,500 - $3,000</option>
            <option value="high">Over $3,000</option>
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Wallet size={12} />
          </div>
        </div>

        {/* Duration select */}
        <div className="relative shrink-0">
          <select
            value={activeDurationRange}
            onChange={(e) => handleDurationRangeChange(e.target.value)}
            className="flex items-center gap-2 pl-8 pr-7 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-800 hover:bg-gray-50 transition-colors appearance-none cursor-pointer focus:ring-0 focus:outline-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
            }}
          >
            <option value="">Duration: All</option>
            <option value="short">Under 5 Days</option>
            <option value="mid">5 - 8 Days</option>
            <option value="long">Over 8 Days</option>
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Clock size={12} />
          </div>
        </div>

        {/* Rating select */}
        <div className="relative shrink-0">
          <select
            value={activeRating}
            onChange={(e) => handleRatingChange(e.target.value)}
            className="flex items-center gap-2 pl-8 pr-7 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-800 hover:bg-gray-50 transition-colors appearance-none cursor-pointer focus:ring-0 focus:outline-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
            }}
          >
            <option value="">Rating: All</option>
            <option value="4.8">4.8+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Star size={12} />
          </div>
        </div>

        {/* Highlighted "Includes Flights" Filter */}
        <button
          onClick={handleFlightsClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer border-0 ${
            flightsActive
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
              : 'bg-blue-50 border border-blue-100 text-blue-600 hover:bg-blue-100'
          }`}
        >
          <Plane size={14} className="rotate-45" />
          Includes Flights
        </button>

        {activeFilterCount > 0 && (
          <>
            <div className="h-6 w-[1px] bg-gray-200 mx-1 hidden md:block" />
            {/* Clear Filters Button */}
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold shadow-lg shadow-gray-200 cursor-pointer border-0"
            >
              <SlidersHorizontal size={14} />
              Clear Filters ({activeFilterCount})
            </button>
          </>
        )}
      </div>

      {/* Theme & Sort Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-4">
        {/* Theme Icons */}
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {themes.map((theme) => {
            const isActive = activeCategory.toLowerCase() === theme.label.toLowerCase();
            return (
              <button
                key={theme.label}
                onClick={() => handleThemeClick(theme.label)}
                className={`flex items-center gap-2 whitespace-nowrap pb-1 transition-all border-b-2 cursor-pointer border-0 bg-transparent ${
                  isActive
                    ? 'border-rose-500 text-rose-500 font-bold scale-105'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className={isActive ? 'text-rose-500' : 'text-gray-300'}>
                  {theme.icon}
                </span>
                <span className="text-xs font-medium">{theme.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto cursor-pointer group">
          <span className="text-xs text-gray-400">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-transparent border-0 outline-none text-xs font-bold text-gray-900 focus:ring-0 cursor-pointer text-right group-hover:text-blue-600 transition-colors py-0 pl-1 pr-6"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23111827' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',
            }}
          >
            <option value="recommended">Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
    </div>
  );
};
