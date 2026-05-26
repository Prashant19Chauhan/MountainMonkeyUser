import Image from "@/components/ui/Image";
import React from 'react';
import Link from 'next/link';
import { Wifi, Coffee, Star } from 'lucide-react';
import { TourPackage, Stay, PackageAccommodationInfo, Destination } from '@/types/type';

type PackageStaysProps = {
  packageDetails: TourPackage;
  heroImages: string[];
};

export const PackageStays = ({ packageDetails, heroImages }: PackageStaysProps) => {
  if (!packageDetails.accommodations || packageDetails.accommodations.length === 0) return null;

  const destination = packageDetails.destination?.id as Destination | undefined;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Accommodations with this trip</h2>
      <div className="space-y-4">
        {packageDetails.accommodations.map((accommodation: PackageAccommodationInfo & { stayId: Stay }, index: number) => (
          <Link 
            href={`/stays/${accommodation.stayId?.slug || ''}`}
            key={accommodation.stayId?._id || index} 
            className="flex flex-col sm:flex-row bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow no-underline cursor-pointer group"
          >
            <div className="sm:w-48 h-40 relative flex-shrink-0">
              <Image 
                src={heroImages[index % heroImages.length]} 
                className="w-full h-full object-cover" 
                alt={accommodation.stayId?.name || 'Stay image'}
              />
              <div className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold">
                {index === 0 ? 'Standard' : 'Upgrade'}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition truncate">{accommodation.stayId?.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{destination?.name || 'Location'}</p>
                <div className="flex gap-2">
                  <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1">
                    <Wifi size={10}/> Free Wifi
                  </span>
                  <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1">
                    <Coffee size={10}/> Breakfast
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} className="fill-yellow-400 text-yellow-400"/> 4.8
                </div>
                <p className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">
                  {index === 0 ? 'Included in Price' : `+ ₹${accommodation.priceRangeForPackage?.min || 0}`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
