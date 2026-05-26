"use client";

import Image from "@/components/ui/Image";
import React from 'react';
import { TrendingUp, MapPin, Star, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useInView } from '@/hooks/useInView';
import { useTrendingDestinations } from '@/hooks/useDestinations';
import { Destination } from '@/types/type';

export const TrendingDestinationsSection = () => {
  const router = useRouter();
  const [trendingRef, isTrendingVisible] = useInView();
  const { data: trendingData, isLoading: isLoadingTrending } = useTrendingDestinations(isTrendingVisible);

  const trendingDestinations: Destination[] = trendingData?.data || [];

  return (
    <section ref={trendingRef}>
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <TrendingUp size={20} />
            <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          </div>
          <p className="text-gray-500 text-sm">The most popular destinations travelers are booking right now.</p>
        </div>
        <button 
          onClick={() => router.push('/destinations?filter=trending')} 
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[500px]">
        {isLoadingTrending ? (
          <div className="lg:col-span-3 h-full flex items-center justify-center text-gray-400">
            Loading trending destinations...
          </div>
        ) : trendingDestinations.length > 0 ? (
          <>
            {/* Large Featured Spotlight Element */}
            <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group">
              <Image 
                src={trendingDestinations[0]?.images?.[0] || "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80"} 
                alt={trendingDestinations[0]?.name || "Destination"} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold text-dynamic-shadow px-3 py-1 rounded-md uppercase tracking-wider">
                #1 Trending
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                }} 
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 cursor-pointer z-10"
              >
                <Heart size={18} />
              </div>
              
              <div className="absolute bottom-8 left-8 text-white">
                <div className="flex items-center gap-1 text-xs opacity-90 mb-1">
                  <MapPin size={12} /> {trendingDestinations[0]?.location?.address?.split(',').pop()?.trim() || "Location"}
                </div>
                <h3 className="text-4xl font-bold mb-4">{trendingDestinations[0]?.name || "Destination"}</h3>
                <div className="flex items-center gap-4">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium">
                    Verified Active Hub
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" /> {trendingDestinations[0]?.ratings?.average || "4.8"}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => router.push(`/destinations/${trendingDestinations[0]?.slug || trendingDestinations[0]?._id}`)}
                className="absolute bottom-8 right-8 bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors"
              >
                Explore City
              </button>
            </div>

            {/* Right Sided Dual Grid Stack */}
            <div className="flex flex-col gap-4">
              {trendingDestinations.slice(1, 3).map((dest: Destination, index: number) => (
                <div 
                  key={dest._id || index} 
                  onClick={() => router.push(`/destinations/${dest.slug}`)}
                  className="relative flex-1 rounded-3xl overflow-hidden group cursor-pointer"
                >
                  <Image 
                    src={dest.images?.[0] || "https://images.unsplash.com/photo-1633321088390-843d7d73948e?auto=format&fit=crop&q=80"} 
                    alt={dest.name || "Destination"} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-bold">{dest.name}</h4>
                    <p className="text-[10px] opacity-80 uppercase tracking-widest">
                      {dest.location?.address?.split(',').pop()?.trim() || "Location"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="lg:col-span-3 text-center text-gray-500">
            No trending destinations available.
          </div>
        )}
      </div>
    </section>
  );
};
