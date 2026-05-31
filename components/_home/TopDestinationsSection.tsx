"use client";

import Image from "@/components/ui/Image";
import React from 'react';
import { Heart } from 'lucide-react';
import { useTopDestinations } from '@/hooks/useHome';
import Link from 'next/link';

type TTopDestination = {
  _id: string;
  slug: string;
  name: string;
  images: string[];
};

export const TopDestinationsSection = () => {
  const { data: topDestinations, isLoading: destinationsLoading } = useTopDestinations();

  return (
    <section className="max-w-7xl mx-auto py-12 px-6 overflow-hidden">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black text-foreground text-dynamic-shadow tracking-tight">Top Destinations & Cities</h2>
          <p className="text-foreground/60 mt-2 font-medium">Explore by region and discover the best spots.</p>
        </div>
        <Link href={`/destinations`} className='cursor-pointer no-underline'>
          <div className="text-rose-500 font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
            See all <span className="text-xl">→</span>
          </div>
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth px-1">
        {destinationsLoading ? (
          <div className="w-full text-center py-24 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
             <div className="animate-pulse flex flex-col items-center">
               <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
               <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Exploring the map...</p>
             </div>
          </div>
        ) : topDestinations && topDestinations.length > 0 ? (
          topDestinations.map((dest: TTopDestination) => (
            <Link href={`/destinations/${dest.slug}`} key={dest._id} className='cursor-pointer no-underline'>
              <div className="min-w-[280px] group snap-start">
                <div className="relative aspect-[3/4] bg-slate-100 rounded-[32px] overflow-hidden mb-6 shadow-lg shadow-slate-200/50 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="absolute top-5 right-5 z-10 p-2.5 bg-white/40 backdrop-blur-md rounded-2xl text-slate-800 hover:bg-white hover:scale-110 transition-all border border-white/20 cursor-pointer"
                  >
                    <Heart className="w-4 h-4" />
                  </div>
                  {dest.images?.[0] ? (
                    <Image src={dest.images[0]} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <Image alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-[10px] font-black tracking-widest uppercase mb-1 opacity-80">DISCOVER</p>
                    <h3 className="font-black text-xl leading-tight line-clamp-2 break-words">{dest.name}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="w-full text-center py-20 bg-slate-50 rounded-[40px]">
            <p className="text-slate-400 font-bold italic">No top destinations found at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};
