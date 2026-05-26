import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

type DestinationMustVisitProps = {
  localInfo: any;
};

export const DestinationMustVisit = ({ localInfo }: DestinationMustVisitProps) => {
  if (!localInfo?.famousPlaces || localInfo.famousPlaces.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
        <MapPin className="text-rose-500 w-6 h-6 shrink-0" /> Must-Visit Places
      </h2>
      
      <div className="relative border-l-2 border-slate-200 pl-6 ml-4 space-y-6">
        {localInfo.famousPlaces.map((place: any, index: any) => (
          <div key={index} className="relative">
            <span className="absolute -left-[35px] top-0.5 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-[#f8fafc]">
              {index + 1}
            </span>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-sm text-slate-900">{place.name}</h3>
                <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase font-bold">
                  {place.type}
                </span>
              </div>
              <p className="text-slate-500 text-xs mb-2 leading-relaxed">{place.description}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {place.bestTimeToVisit && (
                  <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded flex items-center gap-1">
                    <Calendar size={10}/> {place.bestTimeToVisit}
                  </span>
                )}
                {place.timings && (
                  <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded flex items-center gap-1">
                    <Clock size={10}/> {place.timings}
                  </span>
                )}
                {place.entryFee !== undefined && (
                  <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded">
                    {place.entryFee === 0 ? 'Free Entry' : `₹${place.entryFee}`}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
