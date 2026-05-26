"use client";

import React from 'react';
import { Sun, ChevronLeft, ChevronRight, MapPin, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useInView } from '@/hooks/useInView';
import { useTropicalDestinations } from '@/hooks/useDestinations';
import { Destination } from '@/types/type';

export const TropicalDestinationsSection = () => {
  const router = useRouter();
  const [tropicalRef, isTropicalVisible] = useInView();
  const { data: tropicalData, isLoading: isLoadingTropical } = useTropicalDestinations(isTropicalVisible);

  const tropicalDestinations: Destination[] = tropicalData?.data || [];

  return (
    <section ref={tropicalRef}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-500 mb-1">
            <Sun size={20} />
            <h2 className="text-2xl font-bold text-gray-900">Tropical Paradises</h2>
          </div>
          <p className="text-gray-500 text-sm">Escape to white sand beaches and crystal clear waters.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoadingTropical ? (
          <div className="col-span-full h-32 flex items-center justify-center text-gray-400">
            Loading tropical destinations...
          </div>
        ) : tropicalDestinations.length > 0 ? (
          tropicalDestinations.map((dest: Destination, i: number) => (
            <div 
              key={dest._id || i} 
              onClick={() => router.push(`/destinations/${dest.slug}`)}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img 
                  src={dest.images?.[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80'} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-[10px] font-bold text-white px-2 py-0.5 rounded uppercase">
                  Hot
                </div>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                  }} 
                  className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 cursor-pointer z-10"
                >
                  <Heart size={16} />
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg mb-1">{dest.name}</h4>
                <p className="text-gray-400 text-xs flex items-center gap-1 mb-4 font-medium">
                  <MapPin size={12} /> {dest.location?.address?.split(',').pop()?.trim() || "Location"}
                </p>
                <div className="w-full py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 text-center hover:bg-gray-100 transition-colors cursor-pointer">
                  View Destination
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No tropical destinations found.
          </div>
        )}
      </div>
    </section>
  );
};
