"use client";

import React from 'react';
import { Sun, ChevronLeft, ChevronRight, MapPin, Heart, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useInView } from '@/hooks/useInView';
import { useTropicalPackages } from '@/hooks/usePackages';
import { TourPackage, Destination } from '@/types/type';

export const TropicalPackagesSection = () => {
  const router = useRouter();
  const [tropicalRef, isTropicalVisible] = useInView();
  const { data: tropicalData, isLoading: isLoadingTropical } = useTropicalPackages(isTropicalVisible);

  const tropicalPackages: TourPackage[] = tropicalData?.data || [];

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
          <div className="col-span-full h-32 flex justify-center items-center text-gray-400">
            Loading tropical packages...
          </div>
        ) : tropicalPackages.length > 0 ? (
          tropicalPackages.map((pkg: TourPackage, i: number) => {
            const dest = pkg.destination?.id as Destination | undefined;
            return (
              <div 
                key={pkg._id || i} 
                onClick={() => router.push(`/packages/${pkg.slug}`)}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80'} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-[10px] font-bold text-white px-2 py-0.5 rounded uppercase">
                    Tropical
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
                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="font-bold text-lg mb-1 line-clamp-1">{pkg.title || "Island Getaway"}</h4>
                  <p className="text-gray-400 text-xs flex items-center gap-1 mb-3 font-medium">
                    <MapPin size={12} /> {dest?.name || "Beach"}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">From</span>
                      <span className="font-black text-gray-900">${pkg.pricing?.basePrice || 1200}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <Clock size={12} /> {pkg.duration?.days || 5} Days
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No tropical packages available right now.
          </div>
        )}
      </div>
    </section>
  );
};
