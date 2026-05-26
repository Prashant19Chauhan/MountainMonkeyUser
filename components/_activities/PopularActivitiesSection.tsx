"use client";

import React from 'react';
import { Heart, Star, Clock, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useInView } from '@/hooks/useInView';
import { usePopularActivities, useActivityAdvertisements } from '@/hooks/useActivities';

export const PopularActivitiesSection = () => {
  const router = useRouter();
  const [popularRef, isPopularVisible] = useInView();
  const { data: popularData, isLoading: isLoadingPopular } = usePopularActivities(isPopularVisible);
  const { data: adData } = useActivityAdvertisements();

  const popularActivities = popularData?.data || [];
  const advertisements = adData?.data || [];
  const bottomAd = advertisements.length > 1 ? advertisements[1] : (advertisements[0] || null);

  return (
    <div ref={popularRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
      {isLoadingPopular ? (
        <div className="lg:col-span-3 h-[400px] flex justify-center items-center text-gray-400">
          Loading popular activities...
        </div>
      ) : popularActivities.length > 0 ? (
        <>
          {/* Popular Card Option 1 */}
          <div 
            onClick={() => router.push(`/activities/${popularActivities[0]?.slug}`)}
            className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm cursor-pointer group flex flex-col"
          >
            <div className="relative h-48 bg-slate-100">
              <img src={popularActivities[0]?.images?.[0] || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={popularActivities[0]?.name || "Activity"} />
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                }} 
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer z-10"
              >
                <Heart size={16} />
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1 font-medium"><MapPin size={10}/> {popularActivities[0]?.destinationId?.name || "Paris, France"}</p>
                <h4 className="font-bold text-gray-900 mb-2 truncate">{popularActivities[0]?.name || "Museum Skip-the-Line"}</h4>
                <p className="text-xs text-gray-400 mb-4 flex items-center gap-1 font-medium"><Clock size={14} /> {popularActivities[0]?.timing?.duration ? `${Math.round(popularActivities[0].timing.duration / 60)} Hours` : 'Valid 1 Day'}</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-black text-gray-900">${popularActivities[0]?.pricing?.price || 22}</span>
                <div className="bg-gray-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Star size={12} className="fill-blue-500 text-blue-500" />
                  <span className="text-[10px] font-bold text-gray-900">{popularActivities[0]?.ratings?.average || 4.4}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Promotional Sidebar Card */}
          <div className="relative rounded-[2.5rem] overflow-hidden h-full min-h-[400px] shadow-xs">
            <img 
              src={bottomAd ? bottomAd.imageUrl : "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80"} 
              className="w-full h-full object-cover" 
              alt={bottomAd ? bottomAd.title : "Camera"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end items-center text-center">
              <h3 className="text-2xl font-black text-white mb-2 whitespace-pre-wrap">
                {bottomAd ? bottomAd.title.split('. ').join('.\n') : "Capture Every Moment"}
              </h3>
              <p className="text-white/70 text-xs mb-6 font-medium">
                {bottomAd ? bottomAd.description : "Rent professional camera gear delivered straight to your hotel."}
              </p>
              <button 
                onClick={() => bottomAd?.link && window.open(bottomAd.link, '_blank')}
                className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold text-xs shadow-md"
              >
                View Equipment
              </button>
            </div>
          </div>

          {/* Popular Card Option 2 */}
          {popularActivities.length > 1 && (
            <div 
              onClick={() => router.push(`/activities/${popularActivities[1]?.slug}`)}
              className="lg:col-span-1 bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm flex flex-col cursor-pointer group"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img src={popularActivities[1]?.images?.[0] || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={popularActivities[1]?.name || "Safari"} />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{popularActivities[1]?.tags?.[0] || "Adventure"}</div>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                  }} 
                  className="absolute top-4 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 cursor-pointer z-10"
                >
                  <Heart size={16} />
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1 font-medium"><MapPin size={10}/> {popularActivities[1]?.destinationId?.name || "Dubai, UAE"}</p>
                  <h4 className="font-bold text-gray-900 mb-2 truncate">{popularActivities[1]?.name || "Desert Safari with ATV Ride"}</h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed mb-4 line-clamp-2 font-medium">{popularActivities[1]?.shortDescription || "Experience the thrill of dune bashing..."}</p>
                  <div className="flex gap-4 text-[10px] text-gray-400 mb-4 font-semibold">
                    <span className="flex items-center gap-1"><Clock size={12} /> {popularActivities[1]?.timing?.duration ? `${Math.round(popularActivities[1].timing.duration / 60)} Hours` : '6 Hours'}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> Hotel Pickup</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-xl font-black text-gray-900">${popularActivities[1]?.pricing?.price || 85}</span>
                  <div className="bg-gray-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star size={12} className="fill-blue-500 text-blue-500" />
                    <span className="text-[10px] font-bold text-gray-900">{popularActivities[1]?.ratings?.average || 4.7}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="lg:col-span-3 text-center text-gray-500">No popular activities found.</div>
      )}
    </div>
  );
};
