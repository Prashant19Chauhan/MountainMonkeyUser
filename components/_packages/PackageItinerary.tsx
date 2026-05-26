import Image from "@/components/ui/Image";
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { TourPackage, ItineraryDay } from '@/types/type';

type PackageItineraryProps = {
  packageDetails: TourPackage;
  heroImages: string[];
};

export const PackageItinerary = ({ packageDetails, heroImages }: PackageItineraryProps) => {
  if (!packageDetails.itinerary || packageDetails.itinerary.length === 0) return null;

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Itinerary Details</h2>
        <button type="button" className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-0">
          Download PDF <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-6">
        {packageDetails.itinerary.slice(0, 3).map((day: ItineraryDay, index: number) => (
          <div key={day.day || index} className="flex gap-6 relative">
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full ${index === 0 ? 'bg-blue-600 text-white' : 'bg-white border-2 border-blue-600 text-blue-600'} flex items-center justify-center font-bold text-xs shadow-md`}>
                {day.day}
              </div>
              {index < 2 && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex-1 mb-2 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <span className="text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-2 block">Day {day.day}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{day.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{day.description}</p>
                </div>
                {heroImages[index] && (
                  <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                    <Image src={heroImages[index]} className="w-full h-full object-cover" alt={day.title || 'Itinerary image'}/>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {packageDetails.itinerary.length > 3 && (
        <button type="button" className="w-full py-4 mt-6 rounded-2xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors cursor-pointer">
          View Full {packageDetails.duration?.days || 0}-Day Itinerary
        </button>
      )}
    </section>
  );
};
