"use client";

import React, { useState } from 'react';
import { Settings2, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAllDestinations } from '@/hooks/useDestinations';

const categories = [
  'All', 'Beaches', 'Mountains', 'Cities', 'Historic', 
  'Romantic', 'Adventure', 'Foodie'
];

export const DestinationFilterHeader = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: allDestinationsData, isLoading: isLoadingAll } = useAllDestinations();

  const destinations = allDestinationsData?.data || [];

  return (
    <div className="w-full mx-auto px-8 py-8 font-sans">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Top Destinations</h2>

      {/* Destinations Horizontal Circular Avatar Scroll */}
      <div className="flex items-center gap-8 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
        {isLoadingAll ? (
          <div className="flex gap-8 animate-pulse">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : destinations.map((dest: any) => (
          <div 
            key={dest._id} 
            onClick={() => router.push(`/destinations/${dest._id}`)}
            className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-gray-200 transition-all">
              <img 
                src={dest.images?.[0] || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&h=150&fit=crop'} 
                alt={dest.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-sm font-bold text-gray-900">{dest.name}</span>
          </div>
        ))}
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-gray-100 pt-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap
                ${activeCategory === category 
                  ? 'bg-black text-white border-black shadow-md' 
                  : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-gray-600'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Settings2 size={18} className="text-gray-700" />
            <span className="text-sm font-bold text-gray-900">Filters</span>
          </button>

          <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-500">Sort:</span>
            <span className="text-sm font-bold text-gray-900">Recommended</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
