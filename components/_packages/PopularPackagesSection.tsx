"use client";

import Image from "@/components/ui/Image";
import React from 'react';
import { Package, Clock, Star, Heart, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useInView } from '@/hooks/useInView';
import { usePopularPackages, usePackageAdvertisements } from '@/hooks/usePackages';

export const PopularPackagesSection = () => {
  const router = useRouter();
  const [popularRef, isPopularVisible] = useInView();
  const { data: popularData, isLoading: isLoadingPopular } = usePopularPackages(isPopularVisible);
  const { data: adData } = usePackageAdvertisements();

  const popularPackages = popularData?.data || [];
  const advertisements = adData?.data || [];
  const bottomAd = advertisements.length > 1 ? advertisements[1] : (advertisements[0] || null);

  return (
    <div className="space-y-4 font-sans">
      <div className='flex flex-col gap-2'>
        <div className="flex items-center gap-2">
          <Package className='text-blue-600' size={20}/>
          <h1 className='font-bold text-gray-900 text-xl'>Popular Packages</h1>
        </div>
        <p className='text-gray-500 text-xs font-medium'>
          Discover the most loved destinations by travelers worldwide.
        </p>
      </div>
      
      <div ref={popularRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingPopular ? (
          <div className="lg:col-span-3 h-[500px] flex justify-center items-center text-gray-400">
            Loading popular packages...
          </div>
        ) : popularPackages.length > 0 ? (
          <>
            {/* Popular Card 1 */}
            <div 
              onClick={() => router.push(`/packages/${popularPackages[0]?.slug}`)}
              className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm cursor-pointer group flex flex-col"
            >
              <div className="relative h-56 bg-slate-100">
                <Image 
                  src={popularPackages[0]?.images?.[0] || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80"} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt={popularPackages[0]?.title || "Tokyo"} 
                />
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer z-10"
                >
                  <Heart size={16} />
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                    {popularPackages[0]?.destination?.id?.location?.address?.split(',').pop()?.trim() || "Japan"}
                  </p>
                  <h4 className="font-bold text-gray-900 mb-2 truncate">{popularPackages[0]?.title || "Tokyo City Tour"}</h4>
                  <p className="text-xs text-gray-400 mb-4 flex items-center gap-1 font-medium">
                    <Clock size={14} /> {popularPackages[0]?.duration?.days || 4} Days
                  </p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-black text-gray-900">${popularPackages[0]?.pricing?.basePrice || 1200}</span>
                  <div className="bg-gray-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star size={12} className="fill-blue-500 text-blue-500" />
                    <span className="text-[10px] font-bold text-gray-900">{popularPackages[0]?.ratings?.average || 4.6}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Card 2 */}
            {popularPackages.length > 1 && (
              <div 
                onClick={() => router.push(`/packages/${popularPackages[1]?.slug}`)}
                className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm cursor-pointer group flex flex-col"
              >
                <div className="relative h-56 bg-slate-100">
                  <Image 
                    src={popularPackages[1]?.images?.[0] || "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80"} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={popularPackages[1]?.title || "Maldives"} 
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Trending
                  </div>
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer z-10"
                  >
                    <Heart size={16} />
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                      {popularPackages[1]?.destination?.id?.location?.address?.split(',').pop()?.trim() || "Maldives"}
                    </p>
                    <h4 className="font-bold text-gray-900 mb-2 truncate">{popularPackages[1]?.title || "Maldives Honeymoon"}</h4>
                    <p className="text-xs text-gray-400 mb-4 flex items-center gap-1 font-medium">
                      <Clock size={14} /> {popularPackages[1]?.duration?.days || 8} Days
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-black text-gray-900">${popularPackages[1]?.pricing?.basePrice || 3500}</span>
                    <div className="bg-gray-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Star size={12} className="fill-blue-500 text-blue-500" />
                      <span className="text-[10px] font-bold text-gray-900">{popularPackages[1]?.ratings?.average || 5.0}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Marketing Ad Panel Display Component */}
            <div className="row-span-2 relative h-full min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-xs">
              <Image 
                src={bottomAd ? bottomAd.imageUrl : "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80"} 
                className="w-full h-full object-cover" 
                alt={bottomAd ? bottomAd.title : "Insurance Ad"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <h3 className="text-3xl font-black text-white mb-4 whitespace-pre-wrap">
                  {bottomAd ? bottomAd.title.split('. ').join('.\n') : "Travel with Peace of Mind"}
                </h3>
                <p className="text-white/70 text-sm mb-8 leading-relaxed font-medium">
                  {bottomAd ? bottomAd.description : "Comprehensive travel insurance starting at just $5/day. Cover flights, medical, and bags."}
                </p>
                <button 
                  onClick={() => bottomAd?.link && window.open(bottomAd.link, '_blank')}
                  className="w-full bg-white text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors text-xs"
                >
                  {bottomAd ? "Explore Offer" : "Get a Quote"}
                </button>
              </div>
            </div>

            {/* Popular Card 3 (Asymmetrical Horizontal Element) */}
            {popularPackages.length > 2 && (
              <div 
                onClick={() => router.push(`/packages/${popularPackages[2]?.slug}`)}
                className="lg:col-span-2 bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm flex flex-col md:flex-row cursor-pointer group"
              >
                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-slate-100">
                  <Image 
                    src={popularPackages[2]?.images?.[0] || "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80"} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={popularPackages[2]?.title || "Peru"} 
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider font-sans">
                    Adventure
                  </div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                      {popularPackages[2]?.destination?.id?.location?.address?.split(',').pop()?.trim() || "Peru"}
                    </p>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">{popularPackages[2]?.title || "Machu Picchu Trek"}</h4>
                    <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-2 font-medium">
                      {popularPackages[2]?.shortDescription || "Embark on the journey of a lifetime across the ancient trails."}
                    </p>
                    <div className="flex gap-4 text-xs text-gray-400 mb-6 font-medium">
                      <span className="flex items-center gap-1"><Clock size={14} /> {popularPackages[2]?.duration?.days || 7} Days</span>
                      <span className="flex items-center gap-1"><Zap size={14} /> High Intensity</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="text-2xl font-black text-gray-900">${popularPackages[2]?.pricing?.basePrice || 950}</span>
                    <div className="bg-gray-50 px-2 py-1 rounded-md flex items-center gap-1">
                      <Star size={14} className="fill-blue-500 text-blue-500" />
                      <span className="text-xs font-bold text-gray-900">{popularPackages[2]?.ratings?.average || 4.8}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="lg:col-span-3 text-center text-gray-500">
            No popular packages found.
          </div>
        )}
      </div>
    </div>
  );
};
