"use client";

import Image from "@/components/ui/Image";
import React from 'react';
import { Heart, Star, Clock, RotateCcw, Users, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useInView } from '@/hooks/useInView';
import { useFeaturedActivities } from '@/hooks/useActivities';
import { Activity } from '@/types/type';

export const FeaturedActivitiesSection = () => {
  const router = useRouter();
  const [featuredRef, isFeaturedVisible] = useInView();
  const { data: featuredData, isLoading: isLoadingFeatured } = useFeaturedActivities(isFeaturedVisible);

  const featuredActivities: Activity[] = featuredData?.data || [];

  return (
    <div ref={featuredRef} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {isLoadingFeatured ? (
        <div className="lg:col-span-3 h-64 sm:h-[500px] flex justify-center items-center text-gray-400">
          Loading featured activities...
        </div>
      ) : featuredActivities.length > 0 ? (
        <>
          {/* Large Featured Activity Card Panel */}
          <div 
            onClick={() => router.push(`/activities/${featuredActivities[0]?.slug}`)}
            className="lg:col-span-2 bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer"
          >
            <div className="relative h-[240px] sm:h-[340px] lg:h-[500px]">
              <Image 
                src={featuredActivities[0]?.images?.[0] || "https://images.unsplash.com/photo-1544551763-47a0159f963f?auto=format&fit=crop&q=80"} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt={featuredActivities[0]?.name || "Activity"}
              />
              <div className="absolute top-6 left-6 bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                {featuredActivities[0]?.tags?.[0] || "Must Do"}
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute top-6 right-6 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 shadow-xs cursor-pointer z-10"
              >
                <Heart size={20} />
              </div>
            </div>
            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                <MapPin size={14} /> {featuredActivities[0]?.destinationId?.name || "Location"}, {featuredActivities[0]?.destinationId?.location?.address?.split(',').pop()?.trim() || "Region"}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{featuredActivities[0]?.name || "Amazing Experience"}</h3>
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-gray-400 text-xs mb-5 sm:mb-8 font-medium">
                <span className="flex items-center gap-1.5"><Clock size={16} /> {featuredActivities[0]?.timing?.duration ? `${Math.round(featuredActivities[0].timing.duration / 60)} Hours` : '8 Hours'}</span>
                <span className="flex items-center gap-1.5"><RotateCcw size={16} /> Free Cancellation</span>
                <span className="flex items-center gap-1.5"><Users size={16} /> Small Group</span>
              </div>
              <div className="flex justify-between items-end border-t border-gray-50 pt-4 sm:pt-6">
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">From</p>
                  <span className="text-2xl sm:text-3xl font-black text-gray-900">${featuredActivities[0]?.pricing?.price || "145"}</span>
                </div>
                <div className="bg-gray-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Star size={14} className="fill-blue-500 text-blue-500" />
                  <span className="text-xs font-bold text-gray-900">{featuredActivities[0]?.ratings?.average || 4.9}</span>
                  <span className="text-xs text-gray-400">({featuredActivities[0]?.ratings?.count || '1.2k'})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Multi-Card Column Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
            {featuredActivities.slice(1, 3).map((activity: Activity, idx: number) => (
              <div 
                key={activity._id || idx} 
                onClick={() => router.push(`/activities/${activity.slug}`)}
                className="bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer"
              >
                <div className="relative h-44 sm:h-56 bg-slate-100">
                  <Image src={activity.images?.[0] || "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={activity.name} />
                  {activity.tags?.[0] && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{activity.tags[0]}</div>
                  )}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                    }} 
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer z-10"
                  >
                    <Heart size={16} />
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1 font-medium"><MapPin size={10}/> {activity.destinationId?.name || "Location"}</p>
                  <h4 className="font-bold text-gray-900 mb-1.5 sm:mb-2 truncate">{activity.name || "Activity"}</h4>
                  <p className="text-xs text-gray-400 mb-3 sm:mb-4 flex items-center gap-1 font-medium"><Clock size={14} /> {activity.timing?.duration ? `${Math.round(activity.timing.duration / 60)} Hours` : '3 Hours'}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-black text-gray-900">${activity.pricing?.price || 85}</span>
                    <div className="bg-gray-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Star size={12} className="fill-blue-500 text-blue-500" />
                      <span className="text-[10px] font-bold text-gray-900">{activity.ratings?.average || 4.8}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="lg:col-span-3 text-center text-gray-500">No featured activities found.</div>
      )}
    </div>
  );
};
