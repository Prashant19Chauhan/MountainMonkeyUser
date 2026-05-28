"use client";

import Image from "@/components/ui/Image";
import React from 'react';
import { Info } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useStayAdvertisements } from '@/hooks/useStays';

export const StayPromoBanner = () => {
  const [adsRef, isAdsVisible] = useInView();
  const { data: adData } = useStayAdvertisements(isAdsVisible);

  const advertisements = adData?.data || [];
  const ad = advertisements.length > 0 ? advertisements[0] : null;

  return (
    <section ref={adsRef} className="mb-12 font-sans">
      <div className="flex items-center gap-1.5 mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <Info size={12} />
        {ad ? ad.placement : "Sponsorship"}
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[1.75rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-blue-100/50 overflow-hidden relative group">
        <div className="relative z-10 max-w-md text-center md:text-left mb-5 md:mb-0">
          <div className="bg-blue-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-widest mb-3 sm:mb-5 inline-block">
            Loyalty Points
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-gray-900 mb-2 sm:mb-3">
            {ad ? ad.title : "Join Wanderlust Rewards"}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-medium">
            {ad ? ad.description : "Sign up for free and unlock member-only discounts, late check-out, and exclusive room upgrades."}
          </p>
        </div>
        <button 
          onClick={() => ad?.link && window.open(ad.link, '_blank')}
          className="relative z-10 mt-8 md:mt-0 bg-black text-white px-10 py-4 rounded-2xl font-black text-xs shadow-xl hover:scale-105 transition-transform active:scale-95 whitespace-nowrap"
        >
          Join for Free
        </button>
        {ad && ad.imageUrl && (
          <Image 
            src={ad.imageUrl} 
            alt="Ad background" 
            className="absolute -right-20 -top-20 h-[150%] w-1/2 object-cover opacity-20 group-hover:opacity-30 transition-opacity mix-blend-multiply pointer-events-none" 
          />
        )}
      </div>
    </section>
  );
};
