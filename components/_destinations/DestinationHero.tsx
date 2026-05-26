"use client";

import React, { useState } from 'react';
import { Compass, MapPin, Share2, Heart, Grid } from 'lucide-react';
import { Destination } from '@/types/type';

type DestinationHeroProps = {
  destination: Destination;
  destinationImages: string[];
};

export const DestinationHero = ({ destination, destinationImages }: DestinationHeroProps) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 pt-6">
      
      {/* Dynamic Header Block Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 tracking-wider uppercase">
            <Compass className="w-4 h-4 text-blue-500" /> {destination.placeType || 'Destination'}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            {destination.name}
          </h1>
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {destination.location?.address}
            </span>
            {destination.categories && destination.categories.length > 0 && (
              <>
                <span>·</span>
                <span className="capitalize">{destination.categories[0]}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center">
          <button type="button" className="p-3 bg-white hover:bg-slate-50 rounded-xl transition border border-slate-200/80 text-slate-700 shadow-2xs cursor-pointer">
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className="p-3 bg-white hover:bg-slate-50 rounded-xl transition border border-slate-200/80 text-slate-700 shadow-2xs cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Structural Photo Mesh Canvas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[42vh] md:h-[52vh] rounded-2xl overflow-hidden relative shadow-sm">
        <div className="md:col-span-8 h-full relative overflow-hidden">
          <img src={destinationImages[0]} alt={destination.name} className="w-full h-full object-cover" />
        </div>
        <div className="hidden md:grid grid-rows-2 col-span-4 gap-3 h-full">
          <div className="relative overflow-hidden h-full">
            <img src={destinationImages[1]} alt={`${destination.name} view 1`} className="w-full h-full object-cover" />
          </div>
          <div className="relative overflow-hidden h-full">
            <img src={destinationImages[2]} alt={`${destination.name} view 2`} className="w-full h-full object-cover" />
            <button type="button" className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-slate-300 text-slate-900 text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md hover:bg-white transition cursor-pointer">
              <Grid className="w-4 h-4"/> View Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
