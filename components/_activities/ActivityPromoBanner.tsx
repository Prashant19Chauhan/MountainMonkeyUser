"use client";

import Image from "@/components/ui/Image";
import React from 'react';
import { useInView } from '@/hooks/useInView';
import { useActivityAdvertisements } from '@/hooks/useActivities';

export const ActivityPromoBanner = () => {
  const [adsRef, isAdsVisible] = useInView();
  const { data: adData } = useActivityAdvertisements(isAdsVisible);

  const advertisements = adData?.data || [];
  const topAd = advertisements.length > 0 ? advertisements[0] : null;

  return (
    <div 
      ref={adsRef} 
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[120px] flex items-center px-5 sm:px-8 md:px-12 py-5 sm:py-0 border border-blue-100 shadow-2xs font-sans"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/90 to-transparent z-10" />
      <Image 
        src={topAd ? topAd.imageUrl : "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80"} 
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" 
        alt={topAd ? topAd.title : "Festivals"}
      />
      <div className="relative z-20 flex flex-col md:flex-row md:justify-between w-full md:items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest bg-white px-2 py-0.5 rounded">
            {topAd ? topAd.placement : "Local Events"}
          </span>
          <h2 className="text-xl font-black text-blue-900 mt-1">
            {topAd ? topAd.title : "Experience Local Festivals"}
          </h2>
          <p className="text-blue-700/60 text-xs font-medium">
            {topAd ? topAd.description : "Get exclusive access to the biggest cultural and music festivals."}
          </p>
        </div>
        <button 
          onClick={() => topAd?.link && window.open(topAd.link, '_blank')}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 whitespace-nowrap self-start md:self-auto"
        >
          Find Events
        </button>
      </div>
    </div>
  );
};
