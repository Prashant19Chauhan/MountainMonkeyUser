import React from 'react';
import { Wifi } from 'lucide-react';

type StayAmenitiesProps = {
  stay: any;
};

export const StayAmenities = ({ stay }: StayAmenitiesProps) => {
  if (!stay.amenities || stay.amenities.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900">Resort Core Accommodations</h3>
      <div className="grid grid-cols-2 gap-3">
        {stay.amenities.map((am: string, idx: number) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-bold bg-slate-50 p-3 rounded-xl border border-slate-100/50">
            <Wifi className="w-4 h-4 text-blue-500 flex-shrink-0" /> {am}
          </div>
        ))}
      </div>
    </div>
  );
};
