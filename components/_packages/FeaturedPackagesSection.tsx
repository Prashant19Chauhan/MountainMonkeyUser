"use client";

import Image from "@/components/ui/Image";
import React from 'react';
import { Heart, Star, Clock, Plane, Users, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useInView } from '@/hooks/useInView';
import { useFeaturedPackages } from '@/hooks/usePackages';
import { TourPackage, Destination } from '@/types/type';

export const FeaturedPackagesSection = () => {
  const router = useRouter();
  const [featuredRef, isFeaturedVisible] = useInView();
  const { data: featuredData, isLoading: isLoadingFeatured } = useFeaturedPackages(isFeaturedVisible);

  const featuredPackages: TourPackage[] = featuredData?.data || [];

  return (
    <div ref={featuredRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {isLoadingFeatured ? (
        <div className="lg:col-span-3 h-[450px] flex justify-center items-center text-gray-400">
          Loading featured packages...
        </div>
      ) : featuredPackages.length > 0 ? (
        <>
          {/* Large Featured Card Block */}
          <div 
            onClick={() => router.push(`/packages/${featuredPackages[0]?.slug}`)}
            className="lg:col-span-2 bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer"
          >
            <div className="relative h-[450px]">
              <Image 
                src={featuredPackages[0]?.images?.[0] || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80"} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt={featuredPackages[0]?.title || "Package"}
              />
              <div className="absolute top-6 left-6 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                {featuredPackages[0]?.isFeatured ? "Featured" : "Best Seller"}
              </div>
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="absolute top-6 right-6 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 cursor-pointer z-10"
              >
                <Heart size={20} />
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                <MapPin size={14} /> {(featuredPackages[0]?.destination?.id as Destination | undefined)?.name || "Location"}, {(featuredPackages[0]?.destination?.id as Destination | undefined)?.location?.address?.split(',').pop()?.trim() || "Region"}
              </div>
              <h3 className="text-2xl font-bold mb-4">{featuredPackages[0]?.title || "Amazing Tour"}</h3>
              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8 font-medium">
                <span className="flex items-center gap-1.5"><Clock size={16} /> {featuredPackages[0]?.duration?.days || 7} Days</span>
                {featuredPackages[0]?.transport?.included && (
                  <span className="flex items-center gap-1.5"><Plane size={16} /> Flights Inc.</span>
                )}
                <span className="flex items-center gap-1.5"><Users size={16} /> Up to {Math.floor(Math.random() * 4) + 2} Guests</span>
              </div>
              <div className="flex justify-between items-end border-t border-gray-50 pt-6">
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900">${featuredPackages[0]?.pricing?.basePrice || "899"}</span>
                    <span className="text-sm text-gray-300 line-through font-medium">${(featuredPackages[0]?.pricing?.basePrice || 899) + 200}</span>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 py-1 rounded-lg flex items-center gap-1">
                  <Star size={14} className="fill-blue-500 text-blue-500" />
                  <span className="text-xs font-bold text-gray-900">{featuredPackages[0]?.ratings?.average || 4.9}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Stack Side Cards Panel */}
          <div className="space-y-6">
            {featuredPackages.slice(1, 3).map((pkg: TourPackage, idx: number) => {
              const dest = pkg.destination?.id as Destination | undefined;
              return (
                <div 
                  key={pkg._id || idx} 
                  onClick={() => router.push(`/packages/${pkg.slug}`)}
                  className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer"
                >
                  <div className="relative h-48 bg-slate-100">
                    <Image 
                      src={pkg.images?.[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80"} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      alt={pkg.title} 
                    />
                    {pkg.aiMetadata?.tags?.[0] && (
                      <div className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {pkg.aiMetadata?.tags?.[0]}
                      </div>
                    )}
                    <div 
                      onClick={(e) => e.stopPropagation()} 
                      className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer z-10"
                    >
                      <Heart size={16} />
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                      {dest?.location?.address?.split(',').pop()?.trim() || "Region"}
                    </p>
                    <h4 className="font-bold text-gray-900 mb-2 truncate">{pkg.title || "Adventure Tour"}</h4>
                    <p className="text-xs text-gray-400 mb-4 flex items-center gap-1 font-medium">
                      <Clock size={14} /> {pkg.duration?.days || 5} Days
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-gray-900">${pkg.pricing?.basePrice || 1450}</span>
                      <div className="bg-gray-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Star size={12} className="fill-blue-500 text-blue-500" />
                        <span className="text-[10px] font-bold text-gray-900">{pkg.ratings?.average || 4.7}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="lg:col-span-3 text-center text-gray-500">
          No featured packages found.
        </div>
      )}
    </div>
  );
};
