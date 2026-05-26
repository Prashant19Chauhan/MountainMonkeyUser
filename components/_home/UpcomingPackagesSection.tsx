"use client"

import React from 'react';
import { useInView } from '@/hooks/useInView';
import { useUpcomingPackages } from '@/hooks/useHome';
import { ComingSoonCard } from '@/components/cards/ComingSoonCard';
import Link from 'next/link';
import { TourPackage } from '@/types/type';

export const UpcomingPackagesSection = () => {
  const [upcomingRef, upcomingInView] = useInView();
  const { data:upcomingPackages, isLoading:upcomingLoading } = useUpcomingPackages();

  return (
    <section ref={upcomingRef} className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Upcoming Packages</h2>
          <p className="text-slate-500">Get ready for these exclusive new itineraries dropping soon.</p>
        </div>
        <Link 
          href="/packages"
          className="text-rose-500 font-bold hover:underline"
        >
          See all →
        </Link>
      </div>
      <div className="flex gap-8 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth px-1">
        {upcomingLoading ? (
          <div className="min-w-full py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 animate-pulse">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Preparing new adventures...</p>
          </div>
        ) : (upcomingPackages?.length ?? 0) > 0 ? (
          (upcomingPackages as TourPackage[]).map((pkg: TourPackage) => (
            <div key={pkg._id} className="min-w-[285px] sm:min-w-[320px] md:min-w-[400px] snap-start">
              <ComingSoonCard 
                slug={pkg.slug || ''}
                title={pkg.title} 
                date={pkg.availability?.startDate ? new Date(pkg.availability.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Soon'} 
                image={pkg.images?.[0]}
              />
            </div>
          ))
        ) : (
          <div className="min-w-full py-12 text-center bg-slate-50 rounded-3xl">
            <p className="text-slate-400 font-bold italic">No upcoming packages at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};