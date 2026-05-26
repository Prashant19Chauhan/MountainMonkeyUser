import React from 'react';
import { Compass } from 'lucide-react';
import { Destination } from '@/types/type';

type DestinationOverviewProps = {
  destination: Destination;
};

export const DestinationOverview = ({ destination }: DestinationOverviewProps) => {
  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-2xs space-y-4">
      <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
        <Compass className="w-5 h-5 text-blue-600" /> Destination Overview
      </h2>
      <p className="text-slate-600 text-sm leading-relaxed text-justify">
        {destination.description || destination.shortDescription}
      </p>
      {destination.categories && destination.categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {destination.categories.map((cat: string, i: number) => (
            <span key={i} className="bg-slate-100 text-slate-600 font-bold text-[11px] px-3 py-1.5 rounded-lg capitalize">
              #{cat}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};
