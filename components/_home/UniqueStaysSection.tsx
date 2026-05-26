"use client"

import React from 'react';
import { useInView } from '@/hooks/useInView';
import { useUniqueStays } from '@/hooks/useHome';
import { StayCard } from '@/components/cards/StayCard';
import Link from 'next/link';

export const UniqueStaysSection = () => {
  const [staysRef, staysInView] = useInView();
  const { data:uniqueStays, isLoading:staysLoading } = useUniqueStays();

  return (
    <section ref={staysRef} className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Unique Stays</h2>
          <p className="text-slate-500">Incredible accommodations around the world.</p>
        </div>
        <Link 
          href="/stays"
          className="text-rose-500 font-bold hover:underline"
        >
          See all →
        </Link>
      </div>
      <div className="flex gap-8 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth px-1">
        {staysLoading ? (
          <div className="min-w-full py-12 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 animate-pulse">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Finding cozy nests...</p>
          </div>
        ) : uniqueStays?.length > 0 ? (
          uniqueStays.map((stay: any) => (
            <Link href={`/stays/${stay._id}`} key={stay._id} className='cursor-pointer'>
            <div  className="min-w-[85vw] sm:min-w-[400px] md:min-w-[600px] snap-start">
              <StayCard 
                id={stay._id}
                title={stay.name} 
                location={stay.location?.address || "Multiple Locations"} 
                price={stay.priceRange?.min} 
                image={stay.images?.[0]}
              />
            </div>
            </Link>
          ))
        ) : (
          <div className="min-w-full py-12 text-center bg-slate-50 rounded-[40px]">
            <p className="text-slate-400 font-bold italic">No unique stays found.</p>
          </div>
        )}
      </div>
    </section>
  );
};