"use client";

import React from 'react';
import { Star, Heart, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useInView } from '@/hooks/useInView';
import { useExploreActivities } from '@/hooks/useActivities';

export const ExploreActivitiesSection = () => {
  const router = useRouter();
  const [exploreRef, isExploreVisible] = useInView();
  const { data: exploreData, isLoading: isLoadingExplore } = useExploreActivities(isExploreVisible);

  const exploreActivities = exploreData?.data || [];

  return (
    <div ref={exploreRef} className="space-y-4 font-sans">
      <div>
        <h2 className="text-xl font-bold mb-1">More to Explore</h2>
        <p className="text-gray-400 text-xs font-medium">Discover additional highly-rated experiences.</p>
      </div>
      
      <div className="space-y-4">
        {isLoadingExplore ? (
          <div className="h-44 flex justify-center items-center text-gray-400">
            Loading more experiences...
          </div>
        ) : exploreActivities.length > 0 ? (
          exploreActivities.map((item: any, i: number) => (
            <div 
              key={item._id || i} 
              onClick={() => router.push(`/activities/${item._id}`)}
              className="flex flex-col md:flex-row bg-white rounded-3xl border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer relative"
            >
              <div className="md:w-64 h-44 relative overflow-hidden flex-shrink-0 bg-slate-50">
                <img 
                  src={item.images?.[0] || "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80"} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt={item.name} 
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[8px] font-bold px-2 py-0.5 rounded uppercase">
                  {item.tags?.[0] || "Popular"}
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">
                    {item.destinationId?.name || "Location"}
                  </p>
                  <h4 className="text-lg font-bold text-gray-900 mt-1">{item.name}</h4>
                  <p className="text-gray-400 text-[11px] mt-2 line-clamp-1 font-medium">
                    {item.shortDescription || item.longDescription || "Experience this amazing activity."}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 mt-3 font-semibold">
                    <span className="flex items-center gap-1">
                      <CheckCircle size={10} className="text-blue-500" /> {item.timing?.duration ? `${Math.round(item.timing.duration / 60)} Hours` : '2 Hours'}
                    </span>
                    {item.category && item.category.slice(0, 2).map((cat: string, idx: number) => (
                      <span key={idx} className="flex items-center gap-1 capitalize">
                        <CheckCircle size={10} className="text-blue-500" /> {cat.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Star size={14} className="fill-blue-500 text-blue-500" />
                    <span className="text-gray-900">{item.ratings?.average || 4.8}</span>
                    <span className="text-gray-400 font-normal">({item.ratings?.count || 342} reviews)</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold text-gray-400 uppercase">From</p>
                    <p className="text-xl font-black text-gray-900">${item.pricing?.price || 85}</p>
                  </div>
                </div>
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors bg-white/40 backdrop-blur-md rounded-full md:static md:bg-transparent md:backdrop-blur-none md:mr-6 cursor-pointer z-10"
              >
                <Heart size={20} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No more activities to explore at the moment.
          </div>
        )}
      </div>
    </div>
  );
};
