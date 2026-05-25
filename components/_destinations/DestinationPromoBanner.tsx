"use client";

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useDestinationAdvertisements } from '@/hooks/useDestinations';

export const DestinationPromoBanner = () => {
  const [adsRef, isAdsVisible] = useInView();
  const { data: adData } = useDestinationAdvertisements(isAdsVisible);

  const advertisements = adData?.data || [];
  const topAd = advertisements.length > 0 ? advertisements[0] : null;

  return (
    <section 
      ref={adsRef} 
      className="relative bg-gradient-to-r from-blue-100 via-blue-50 to-white rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between border border-blue-200 overflow-hidden"
    >
      <div className="relative z-10 max-w-lg mb-6 md:mb-0">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <span className="p-1.5 bg-blue-600 text-white rounded-md">
            <TrendingUp size={14} />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest">
            {topAd ? topAd.placement || "Advertisement" : "Wanderlust Elite"}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          {topAd ? topAd.title : "Earn 5x points on all travel bookings"}
        </h2>
        <p className="text-blue-700/70 text-sm leading-relaxed font-medium">
          {topAd ? topAd.description : "Apply now and get 50,000 bonus points after your first purchase. No foreign transaction fees."}
        </p>
      </div>
      <button 
        onClick={() => topAd?.link && window.open(topAd.link, '_blank')}
        className="relative z-10 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 whitespace-nowrap"
      >
        Explore Now
      </button>
      {topAd && topAd.imageUrl && (
        <img 
          src={topAd.imageUrl} 
          alt="Ad background" 
          className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-30 pointer-events-none" 
        />
      )}
    </section>
  );
};
