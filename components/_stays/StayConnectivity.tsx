import React from 'react';
import { Plane, Train, Bus } from 'lucide-react';
import { Stay } from '@/types/type';

type StayConnectivityProps = {
  stay: Stay;
};

export const StayConnectivity = ({ stay }: StayConnectivityProps) => {
  if (!stay.connectivity) return null;

  const conn = stay.connectivity;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900">Transit & Hub Infrastructure</h3>
      <div className="grid gap-2.5 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
        {conn.nearestAirport && (
          <div className="flex justify-between items-center border-b border-slate-200/40 pb-2">
            <span className="text-slate-500 font-bold flex items-center gap-1.5"><Plane className="w-4 h-4 text-slate-400" /> Airport Link</span>
            <span className="font-extrabold text-slate-800">{conn.nearestAirport}</span>
          </div>
        )}
        {conn.nearestRailway && (
          <div className="flex justify-between items-center border-b border-slate-200/40 pb-2">
            <span className="text-slate-500 font-bold flex items-center gap-1.5"><Train className="w-4 h-4 text-slate-400" /> Railway Station</span>
            <span className="font-extrabold text-slate-800">{conn.nearestRailway}</span>
          </div>
        )}
        {conn.nearestBusStop && (
          <div className="flex justify-between items-center pb-0.5">
            <span className="text-slate-500 font-bold flex items-center gap-1.5"><Bus className="w-4 h-4 text-slate-400" /> Local Terminal</span>
            <span className="font-extrabold text-slate-800">{conn.nearestBusStop}</span>
          </div>
        )}
      </div>
    </div>
  );
};
