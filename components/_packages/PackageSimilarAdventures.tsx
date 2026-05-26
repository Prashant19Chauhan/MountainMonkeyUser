import React from 'react';
import { ChevronLeft, ChevronRight, Heart, Clock } from 'lucide-react';
import { TourPackage } from '@/types/type';

type PackageSimilarAdventuresProps = {
  similarPackages: TourPackage[];
  heroImages: string[];
  isLoadingSimilar: boolean;
};

export const PackageSimilarAdventures = ({
  similarPackages,
  heroImages,
  isLoadingSimilar
}: PackageSimilarAdventuresProps) => {
  if (isLoadingSimilar || similarPackages.length === 0) return null;

  return (
    <div className="max-w-8xl mx-auto px-4 md:px-12 lg:px-24 py-16 border-t border-gray-100">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Similar Adventures</h2>
        <div className="flex gap-2">
          <button type="button" className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 cursor-pointer">
            <ChevronLeft size={20} />
          </button>
          <button type="button" className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 cursor-pointer">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarPackages.slice(0, 3).map((similarPackage: TourPackage) => (
          <div key={similarPackage._id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer group flex flex-col">
            <div className="relative h-48">
              <img 
                src={similarPackage.images?.[0] || heroImages[0]} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt={similarPackage.title} 
              />
              <button type="button" className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer">
                <Heart size={16} />
              </button>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                {similarPackage.categories?.[0] || 'Adventure'}
              </p>
              <h4 className="font-bold text-gray-900 mb-2">{similarPackage.title}</h4>
              <div className="mt-auto flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">From</p>
                  <span className="text-lg font-black text-gray-900">
                    ₹{(similarPackage.pricing?.basePrice || 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12}/> {similarPackage.duration?.days || 0} Days
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
