"use client";

import React, { useState } from 'react';
import { Star, Building2, MapPin, Share2, Heart } from 'lucide-react';

import { Stay } from '@/types/type';

type StayHeaderProps = {
  stay: Stay;
};

export const StayHeader = ({ stay }: StayHeaderProps) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          {stay.name}
        </h1>
        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-bold text-slate-500">
          <span className="flex items-center gap-0.5 text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
            <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" /> {stay.ratings?.average || "New"}
          </span>
          <span>·</span>
          <span className="underline">{stay.ratings?.count || 0} Reviews</span>
          <span>·</span>
          <span className="capitalize text-blue-600 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" /> {stay.starRating || 3} Star {stay.type}
          </span>
          <span>·</span>
          <span className="flex items-center gap-0.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {stay.location?.address}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-center">
        <button type="button" className="flex items-center gap-2 text-xs font-bold px-3 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-2xs cursor-pointer">
          <Share2 className="w-4 h-4" /> Share
        </button>
        <button 
          type="button"
          onClick={() => setIsSaved(!isSaved)}
          className="flex items-center gap-2 text-xs font-bold px-3 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-2xs cursor-pointer"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`} /> 
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
};
