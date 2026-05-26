import Image from "@/components/ui/Image";
import React from 'react';
import Link from 'next/link';
import { Star, Hotel } from 'lucide-react';
import { Stay } from '@/types/type';

type DestinationStaysProps = {
  stays: Stay[];
  destinationImages: string[];
};

export const DestinationStays = ({ stays, destinationImages }: DestinationStaysProps) => {
  if (stays.length === 0) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Hotel className="text-blue-500 w-6 h-6 shrink-0" /> Hand-Selected Accommodations
        </h2>
        <p className="text-slate-400 text-xs">Verified hotels and resorts for your stay</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stays.map((stay: Stay, idx: number) => (
          <Link 
            href={`/stays/${stay.slug}`}
            key={stay._id} 
            className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-md transition p-3 flex gap-4 items-center no-underline cursor-pointer group"
          >
            <Image 
              src={stay.images?.[0] || destinationImages[idx % destinationImages.length]} 
              alt={stay.name} 
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0" 
            />
            <div className="flex-1 min-w-0 space-y-1.5">
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-blue-500">
                  {stay.type}
                </span>
                <h4 className="font-bold text-slate-800 text-sm truncate mt-0.5 group-hover:text-blue-600 transition">{stay.name}</h4>
                {stay.starRating && (
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {stay.starRating} Star
                  </div>
                )}
              </div>
              <div className="text-xs font-bold text-slate-900 pt-1.5 border-t border-slate-50 flex items-baseline justify-between">
                <span className="text-slate-400 font-medium text-[10px]">From / Night</span>
                <span className="text-emerald-600 font-black text-sm">
                  ₹{stay.priceRange?.min?.toLocaleString('en-IN') || 'N/A'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
