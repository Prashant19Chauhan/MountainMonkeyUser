import React from 'react';
import { Clock, Plane, Utensils, Users } from 'lucide-react';
import { TourPackage } from '@/types/type';

type PackageHighlightsProps = {
  packageDetails: TourPackage;
};

export const PackageHighlights = ({ packageDetails }: PackageHighlightsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center gap-2 shadow-sm">
        <div className="bg-blue-50 text-blue-600 p-2 rounded-xl"><Clock size={20} /></div>
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Duration</p>
          <p className="text-sm font-bold text-gray-900">{packageDetails.duration?.days || 0} Days</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center gap-2 shadow-sm">
        <div className="bg-green-50 text-green-600 p-2 rounded-xl"><Plane size={20} /></div>
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Transport</p>
          <p className="text-sm font-bold text-gray-900">{packageDetails.transport?.included ? 'Included' : 'Not Inc.'}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center gap-2 shadow-sm">
        <div className="bg-orange-50 text-orange-600 p-2 rounded-xl"><Utensils size={20} /></div>
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Meals</p>
          <p className="text-sm font-bold text-gray-900">{packageDetails.meals?.included ? 'Included' : 'Not Inc.'}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center gap-2 shadow-sm">
        <div className="bg-purple-50 text-purple-600 p-2 rounded-xl"><Users size={20} /></div>
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Group Size</p>
          <p className="text-sm font-bold text-gray-900">Max {packageDetails.availability?.maxSeats || 0} Ppl</p>
        </div>
      </div>
    </div>
  );
};
