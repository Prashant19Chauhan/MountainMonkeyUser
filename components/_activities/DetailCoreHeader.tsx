import React from 'react';
import { Compass, Star, MapPin } from 'lucide-react';

type DetailCoreHeaderProps = {
  activity: any;
};

export const DetailCoreHeader = ({ activity }: DetailCoreHeaderProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-8">
      <div className="max-w-4xl space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest">
          <Compass className="w-4 h-4 text-blue-500" /> {activity.type || "Local Tour"} · Best Time: {activity.bestTimeToVisit || "Check Conditions"}
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {activity.name}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
          <span className="flex items-center gap-1 text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {activity.ratings?.average || "0"} ({activity.ratings?.count || 0} reviews)
          </span>
          <span className="flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {activity.location?.address}
          </span>
        </div>
      </div>
    </div>
  );
};
