"use client";

import Image from "@/components/ui/Image";
import React from 'react';
import { Settings2, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAllDestinations } from '@/hooks/useDestinations';
import { Destination } from '@/types/type';

const categories = [
  'All', 'Beaches', 'Mountains', 'Cities', 'Historic',
  'Romantic', 'Adventure', 'Foodie'
];

export const DestinationFilterHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category') || 'All';
  const sort = searchParams.get('sort') || 'recommended';
  const query = searchParams.get('query') || '';

  const { data: allDestinationsData, isLoading: isLoadingAll } = useAllDestinations();
  const destinations: Destination[] = allDestinationsData?.data || [];

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
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
  if (activeCategory !== 'All') activeFiltersCount++;
  if (query) activeFiltersCount++;

  return (
    <div className="w-full mx-auto px-8 py-8 font-sans">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Top Destinations</h2>

      {/* Destinations Horizontal Circular Avatar Scroll */}
      <div className="flex items-center gap-8 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
        {isLoadingAll ? (
          <div className="flex gap-8 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : destinations.map((dest: Destination) => (
          <div
            key={dest._id}
            onClick={() => router.push(`/destinations/${dest.slug || dest._id}`)}
            className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-rose-500 transition-all shadow-sm">
              <Image
                src={dest.images?.[0] || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&h=150&fit=crop'}
                alt={dest.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-sm font-bold text-gray-900 group-hover:text-rose-500 transition-colors">{dest.name}</span>
          </div>
        ))}
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-gray-100 pt-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap cursor-pointer
                ${activeCategory.toLowerCase() === category.toLowerCase()
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-gray-600'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-5 py-2.5 border border-rose-200 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors text-sm font-bold cursor-pointer"
            >
              <SlidersHorizontal size={16} />
              Reset ({activeFiltersCount})
            </button>
          )}

          <div className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors relative">
            <span className="text-sm text-gray-500">Sort:</span>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent border-0 outline-none text-sm font-bold text-gray-900 focus:ring-0 cursor-pointer pl-1 pr-6 py-0 appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23111827' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
              }}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Rating</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
