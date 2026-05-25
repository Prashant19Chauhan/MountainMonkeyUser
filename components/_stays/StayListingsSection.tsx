"use client";

import React from 'react';
import { Heart, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useInView } from '@/hooks/useInView';
import { useAllStays } from '@/hooks/useStays';

const StayCard = ({ stay }: { stay: any }) => {
  const router = useRouter();
  const isFavorite = stay.popularityScore > 90 || stay.aiScore?.overall >= 4.8;
  const image = stay.images?.[0] || "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80";
  const location = stay.destinationId?.name || stay.location?.address?.split(',').pop()?.trim() || "Destination";
  const host = stay.name || "Hosted Professionally";
  const rating = stay.ratings?.average || 4.8;
  const price = stay.priceRange?.min || 890;

  return (
    <div 
      onClick={() => router.push(`/stays/${stay._id}`)}
      className="flex flex-col group cursor-pointer"
    >
      <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-3 bg-slate-100">
        <img src={image} alt={location} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
        {isFavorite && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-[8px] font-bold uppercase tracking-wider shadow-sm">
            Guest favorite
          </div>
        )}
        <div 
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-4 right-4 p-2 text-white hover:scale-110 transition-transform z-10 cursor-pointer"
        >
          <Heart size={20} className="drop-shadow-md" />
        </div>
      </div>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">{location}</h3>
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-black" />
          <span className="text-xs">{rating}</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1 font-medium">{host}</p>
      <p className="text-xs text-gray-500 font-medium">Available Now</p>
      <p className="text-sm font-bold mt-1 text-gray-900">₹{price} <span className="font-normal text-gray-400">night</span></p>
    </div>
  );
};

export const StayListingsSection = () => {
  const [staysRef, isStaysVisible] = useInView();
  const { data: staysData, isLoading: isLoadingStays } = useAllStays(isStaysVisible);

  const stays = staysData?.data || [];

  return (
    <div className="font-sans">
      <div className="flex justify-between items-center mb-8">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          Over 1,000 architectural properties inside database maps
        </p>
      </div>
      
      {/* Grid Listings Layer */}
      <div ref={staysRef}>
        {isLoadingStays ? (
          <div className="h-64 flex justify-center items-center text-gray-400">
            Loading amazing stays...
          </div>
        ) : stays.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-20">
            {stays.map((stay: any) => (
              <StayCard key={stay._id} stay={stay} />
            ))}
          </div>
        ) : (
          <div className="h-64 flex justify-center items-center text-gray-500 mb-20">
            No stays available right now.
          </div>
        )}
      </div>

      {/* Paginate Results Button */}
      <div className="flex justify-center pb-16">
        <button className="border-2 border-gray-100 text-gray-900 px-12 py-3.5 rounded-2xl font-black text-xs hover:bg-slate-50 transition-all shadow-xs">
          Show more results
        </button>
      </div>
    </div>
  );
};
