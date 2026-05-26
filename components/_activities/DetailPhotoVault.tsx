"use client";

import React, { useState } from 'react';
import { Share2, Heart, Award } from 'lucide-react';

import { Activity } from '@/types/type';

type DetailPhotoVaultProps = {
  activity: Activity;
};

export const DetailPhotoVault = ({ activity }: DetailPhotoVaultProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const images = activity.images ?? [];
  const primaryImage = images[0];
  const secondaryImage = images[1] ?? primaryImage;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-6 grid grid-cols-1 md:grid-cols-3 gap-3 h-[30vh] md:h-[42vh] relative">
      <div className="md:col-span-2 h-full rounded-2xl overflow-hidden relative group shadow-2xs bg-slate-200">
        {primaryImage ? (
          <img src={primaryImage} alt={activity.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-700 font-bold">Image Preview Vault Offline</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button className="p-2.5 bg-white rounded-xl shadow-xs hover:bg-slate-50 transition text-slate-700 border border-slate-100 cursor-pointer">
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsSaved(!isSaved)} 
            className="p-2.5 bg-white rounded-xl shadow-xs hover:bg-slate-50 transition text-slate-700 border border-slate-100 cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="hidden md:grid grid-rows-2 gap-3 h-full">
        <div className="rounded-2xl overflow-hidden shadow-xs bg-slate-200">
          {secondaryImage && (
            <img src={secondaryImage} alt="Gallery Frame 1" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col justify-center items-center text-center p-6 text-white relative shadow-xs">
          <Award className="w-8 h-8 text-amber-400 mb-2" />
          <span className="text-2xl font-black">{activity.ratings?.average || "New"} / 5</span>
          <p className="text-xs text-slate-400 mt-1">From {activity.ratings?.count || 0} reviews</p>
        </div>
      </div>
    </div>
  );
};
