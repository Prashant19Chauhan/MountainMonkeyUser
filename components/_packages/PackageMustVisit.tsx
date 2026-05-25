import React from 'react';
import { Calendar, Clock } from 'lucide-react';

type PackageMustVisitProps = {
  localInfo: any;
};

export const PackageMustVisit = ({ localInfo }: PackageMustVisitProps) => {
  if (!localInfo?.famousPlaces || localInfo.famousPlaces.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Must-Visit Places</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {localInfo.famousPlaces.map((place: any, index: any) => (
          <div key={index} className="bg-white border border-gray-100 rounded-2xl p-5">
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-2 block">{place.type}</span>
            <h4 className="font-bold text-gray-900 mb-2">{place.name}</h4>
            <p className="text-sm text-gray-500 mb-3">{place.description}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {place.bestTimeToVisit && (
                <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
                  <Calendar size={10}/> {place.bestTimeToVisit}
                </span>
              )}
              {place.timings && (
                <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
                  <Clock size={10}/> {place.timings}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
