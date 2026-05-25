"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Share, Heart, Star, MapPin } from 'lucide-react';

type PackageHeroProps = {
  packageDetails: any;
  heroImages: string[];
};

export const PackageHero = ({ packageDetails, heroImages }: PackageHeroProps) => {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const nextImage = () => setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  const prevImage = () => setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="relative h-[60vh] w-full">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <img 
          src={heroImages[currentHeroImage]} 
          alt={packageDetails.title} 
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>
      
      {/* Carousel Controls */}
      {heroImages.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 z-10 pointer-events-none">
            <button 
              type="button"
              onClick={prevImage} 
              className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              type="button"
              onClick={nextImage} 
              className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-32 right-12 z-10 flex gap-2">
            {heroImages.map((_: any, idx: any) => (
              <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentHeroImage ? 'bg-white w-6' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}

      {/* Top Nav Actions (Floating) */}
      <div className="absolute top-8 right-8 flex gap-3 z-10 hidden md:flex">
        <button type="button" className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-bold transition-all border border-white/30 cursor-pointer">
          <Share size={16} /> Share
        </button>
        <button type="button" className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-bold transition-all border border-white/30 cursor-pointer">
          <Heart size={16} /> Save
        </button>
      </div>

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-end justify-between max-w-7xl mx-auto w-full relative">
          <div className="w-full md:w-2/3 pr-4">
            <div className="flex items-center gap-3 mb-4">
              {packageDetails.isFeatured && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Best Seller</span>
              )}
              {packageDetails.ratings.count > 0 && (
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400"/> {packageDetails.ratings.average.toFixed(1)} ({packageDetails.ratings.count} Reviews)
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 shadow-sm">
              {packageDetails.title}
            </h1>
            <p className="text-white/80 text-lg flex items-center gap-2">
              <MapPin size={18} /> {packageDetails.destination.id.name} • {packageDetails.duration.days} Days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
