"use client";

import React, { useState, useMemo } from 'react';
import { Compass } from 'lucide-react';

type DestinationActivitiesProps = {
  activities: any[];
  destinationImages: string[];
};

export const DestinationActivities = ({ activities, destinationImages }: DestinationActivitiesProps) => {
  const [activityFilter, setActivityFilter] = useState<string>('All');

  const activityCategories = useMemo<string[]>(() => {
    if (!activities.length) return ['All'];
    const categories = Array.from(new Set(activities.map((act: any) => act.type))) as string[];
    return ['All', ...categories];
  }, [activities]);

  const filteredActivities = useMemo(() => {
    if (activityFilter === 'All') return activities;
    return activities.filter((act: any) => act.type === activityFilter);
  }, [activityFilter, activities]);

  if (activities.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Compass className="text-blue-500 w-6 h-6 shrink-0" /> Top Experiences
          </h2>
          <p className="text-slate-400 text-xs">Activities and attractions in this destination</p>
        </div>

        {activityCategories.length > 1 && (
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold overflow-x-auto">
            {activityCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActivityFilter(cat)}
                className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap capitalize cursor-pointer ${
                  activityFilter === cat 
                    ? 'bg-white text-slate-900 shadow-2xs' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filteredActivities.map((act: any, idx: any) => (
          <div key={act._id} className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-md transition">
            <div className="h-32 overflow-hidden relative">
              <img 
                src={destinationImages[idx % destinationImages.length]} 
                alt={act.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
              />
              <span className="absolute top-2 left-2 bg-slate-900/70 backdrop-blur-md text-[9px] text-white font-bold uppercase tracking-wider px-2 py-0.5 rounded capitalize">
                {act.type}
              </span>
            </div>
            <div className="p-3.5 flex justify-between items-start gap-2">
              <h4 className="font-bold text-xs text-slate-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition">
                {act.name}
              </h4>
              <div className="text-right flex-shrink-0">
                {act.pricing.isFree ? (
                  <span className="text-xs font-black text-emerald-600">Free</span>
                ) : (
                  <>
                    <span className="text-[9px] text-slate-400 block">From</span>
                    <span className="text-xs font-black text-emerald-600">
                      ₹{act.pricing.price.toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
