"use client"

import { useInView } from '@/hooks/useInView';
import { usePopularActivities } from '@/hooks/useHome';
import { HorizontalCard } from '@/components/cards/HorizontalCard';
import Link from 'next/link';

type ActivityType = {
  _id: string,
  name: string,
  location: { address: string },
  pricing: { price: number },
  images: string[],
}

export const PopularActivitiesSection = () => {
  const [activitiesRef, activitiesInView] = useInView();
  const { data: popularActivities, isLoading: activitiesLoading } = usePopularActivities();

  return (
    <section ref={activitiesRef} className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Popular Activities</h2>
          <p className="text-slate-500">Unique experiences to add to your trip.</p>
        </div>
        <Link 
          href="/activities"
          className="text-rose-500 font-bold hover:underline"
        >
          See all →
        </Link>
      </div>
      <div className="flex gap-8 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth px-1">
        {activitiesLoading ? (
          <div className="min-w-full py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 animate-pulse">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading experiences...</p>
          </div>
        ) : popularActivities?.length > 0 ? (
          popularActivities.map((activity:ActivityType) => (
            <div key={activity._id} className="min-w-[285px] sm:min-w-[320px] md:min-w-[400px] snap-start">
              <HorizontalCard 
                id={activity._id}
                title={activity.name} 
                location={activity.location?.address || "Multiple Locations"} 
                price={activity.pricing?.price} 
                image={activity.images?.[0]}
              />
            </div>
          ))
        ) : (
          <div className="min-w-full py-12 text-center bg-slate-50 rounded-3xl">
            <p className="text-slate-400 font-bold italic">No popular activities found.</p>
          </div>
        )}
      </div>
    </section>
  );
};