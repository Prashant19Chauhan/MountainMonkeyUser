"use client";

import Image from "@/components/ui/Image";
import React from 'react';
import { useInView } from '@/hooks/useInView';
import { usePackageAdvertisements } from '@/hooks/usePackages';

export const PackagePromoBanner = () => {
  const [adsRef, isAdsVisible] = useInView();
  const { data: adData } = usePackageAdvertisements(isAdsVisible);

  const advertisements = adData?.data || [];
  const topAd = advertisements.length > 0 ? advertisements[0] : null;

  return (
    <div 
      ref={adsRef} 
      className="relative rounded-3xl overflow-hidden bg-blue-50 border border-blue-100 p-8 flex flex-col md:flex-row items-center justify-between"
    >
      <div className="relative z-10 mb-4 md:mb-0">
        <h2 className="text-2xl font-black text-blue-600 mb-2">
          {topAd ? topAd.title : "Summer Flash Sale"}
        </h2>
        <p className="text-blue-400 text-sm font-medium">
          {topAd ? topAd.description : "Get up to 30% off on all Mediterranean yacht tours if you book before Friday."}
        </p>
      </div>
      <button 
        onClick={() => topAd?.link && window.open(topAd.link, '_blank')}
        className="relative z-10 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 whitespace-nowrap"
      >
        Claim Offer
      </button>
      {topAd && topAd.imageUrl && (
        <Image 
          src={topAd.imageUrl} 
          alt="Sale background" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" 
        />
      )}
    </div>
  );
};
