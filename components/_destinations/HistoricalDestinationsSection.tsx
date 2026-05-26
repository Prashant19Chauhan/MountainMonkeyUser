"use client";

import React from 'react';
import { Landmark, ArrowRight, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useInView } from '@/hooks/useInView';
import { useHistoryDestinations, useDestinationAdvertisements } from '@/hooks/useDestinations';
import { Destination } from '@/types/type';

export const HistoricalDestinationsSection = () => {
  const router = useRouter();
  const [historyRef, isHistoryVisible] = useInView();
  const { data: historyData, isLoading: isLoadingHistory } = useHistoryDestinations(isHistoryVisible);
  const { data: adData } = useDestinationAdvertisements();

  const historyDestinations: Destination[] = historyData?.data || [];
  const advertisements = adData?.data || [];
  const bottomAd = advertisements.length > 1 ? advertisements[1] : (advertisements[0] || null);

  return (
    <section ref={historyRef} className="py-4 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Split List Item Components Block */}
        <div className="lg:col-span-2 space-y-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Landmark size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Rich History</h2>
            </div>
            <p className="text-gray-400 text-sm font-medium">Walk through the streets of ancient empires.</p>
          </div>

          <div className="space-y-4">
            {isLoadingHistory ? (
              <div className="h-32 flex items-center justify-center text-gray-400">
                Loading historical destinations...
              </div>
            ) : historyDestinations.length > 0 ? (
              historyDestinations.map((item: Destination, index: number) => (
                <div 
                  key={item._id || index} 
                  onClick={() => router.push(`/destinations/${item.slug}`)}
                  className="flex flex-col md:flex-row overflow-hidden rounded-[2rem] border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  <div className="md:w-2/5 h-48 md:h-auto overflow-hidden bg-slate-100">
                    <img 
                      src={item.images?.[0] || "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80"} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  </div>
                  
                  <div className="md:w-3/5 p-8 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-blue-600 text-[10px] font-black tracking-widest uppercase block">
                        {item.location?.address?.split(',').pop()?.trim() || "Location"}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 font-medium">
                        {item.shortDescription || "Discover the breathtaking rich history and cultural heritage of this beautiful destination."}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <span className="text-xs font-black text-slate-900">Ghumakkad Go Verified</span>
                      <div className="p-2.5 bg-gray-100 rounded-full text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No historical destinations found.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Right-Sided Promotional Item Display Block */}
        <div className="relative">
          <div className="flex items-center gap-1 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            <Info size={12} />
            ADVERTISEMENT
          </div>
          
          <div className="relative h-[600px] rounded-[2.5rem] overflow-hidden group shadow-md">
            <img 
              src={bottomAd ? bottomAd.imageUrl : "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&q=80"} 
              alt={bottomAd ? bottomAd.title : "Travel Gear"} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute inset-0 p-10 flex flex-col justify-end items-center text-center">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-lg mb-6">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                  Partner • {bottomAd ? (bottomAd.placement || "Advertisement") : "Away Luggage"}
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4 leading-tight whitespace-pre-wrap">
                {bottomAd ? bottomAd.title.split('. ').join('.\n') : "Travel lighter.\nTravel smarter."}
              </h3>
              
              <p className="text-white/80 text-xs mb-10 max-w-[240px] font-medium">
                {bottomAd ? bottomAd.description : "Upgrade to the premium polycarbonate carry-on. Built for the modern traveler."}
              </p>
              
              <button 
                onClick={() => bottomAd?.link && window.open(bottomAd.link, '_blank')}
                className="w-full bg-white text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors text-xs"
              >
                Explore Offer
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
