"use client";

import React from 'react';
import { MapPin, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useInView } from '@/hooks/useInView';
import { useAllStays } from '@/hooks/useStays';

export const StayMapPreview = () => {
  const router = useRouter();
  const [staysRef, isStaysVisible] = useInView();
  const { data: staysData } = useAllStays(isStaysVisible);

  const stays = staysData?.data || [];

  return (
    <div 
      ref={staysRef} 
      className="mb-8 sm:mb-12 relative h-[240px] sm:h-[320px] md:h-[400px] w-full rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden border border-emerald-100 bg-emerald-50/30 font-sans"
    >
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain pointer-events-none" />
      
      <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/50 pointer-events-none">
        <MapPin size={16} className="text-emerald-600" />
        <span className="text-xs font-bold text-gray-900">Exploring Global Stays</span>
      </div>

      <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
        <button className="p-2.5 bg-white rounded-xl shadow-sm hover:bg-gray-50 text-gray-500 transition-colors border border-gray-100"><Plus size={18}/></button>
        <button className="p-2.5 bg-white rounded-xl shadow-sm hover:bg-gray-50 text-gray-500 transition-colors border border-gray-100"><Minus size={18}/></button>
      </div>

      {/* Price Radial Pin Highlights (Safe routing bound) */}
      {stays[0] && (
        <div 
          onClick={() => router.push(`/stays/${stays[0].slug || stays[0]._id}`)}
          className="absolute top-1/4 left-1/3 animate-bounce cursor-pointer z-10"
        >
          <div className="bg-white px-3 py-1.5 rounded-full shadow-xl text-[10px] font-black border border-gray-100 hover:bg-black hover:text-white transition-all">
            ₹{stays[0].priceRange?.min || '890'}
          </div>
        </div>
      )}
      {stays[1] && (
        <div 
          onClick={() => router.push(`/stays/${stays[1].slug || stays[1]._id}`)}
          className="absolute top-1/2 right-1/4 cursor-pointer z-10"
        >
          <div className="bg-black text-white px-3 py-1.5 rounded-full shadow-xl text-[10px] font-black border border-black hover:bg-slate-800 transition-all">
            ₹{stays[1].priceRange?.min || '1,180'}
          </div>
        </div>
      )}
      {stays[2] && (
        <div 
          onClick={() => router.push(`/stays/${stays[2].slug || stays[2]._id}`)}
          className="absolute bottom-1/4 left-1/2 cursor-pointer z-10"
        >
          <div className="bg-white px-3 py-1.5 rounded-full shadow-xl text-[10px] font-black border border-gray-100 hover:bg-black hover:text-white transition-all">
            ₹{stays[2].priceRange?.min || '2,400'}
          </div>
        </div>
      )}
    </div>
  );
};
