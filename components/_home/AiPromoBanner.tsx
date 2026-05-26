"use client"

import Image from "@/components/ui/Image";
import React from 'react';
import { useHomeAds } from '@/hooks/useHome';
import Link from 'next/link';

export const AiPromoBanner = () => {
  const { data:homeAds, isLoading } = useHomeAds();
  const aiPromoAd = homeAds?.[0];

  return (
    <section className="max-w-7xl mx-auto px-4 mb-24">
      <div className="bg-slate-900 rounded-[48px] p-16 relative overflow-hidden group shadow-2xl shadow-slate-200 min-h-[400px] flex items-center">
        {isLoading ? (
          <div className="w-full flex flex-col gap-4 animate-pulse">
            <div className="w-24 h-6 bg-slate-800 rounded-lg"></div>
            <div className="w-2/3 h-12 bg-slate-800 rounded-xl"></div>
            <div className="w-1/2 h-8 bg-slate-800 rounded-lg"></div>
          </div>
        ) : aiPromoAd ? (
          <div className="relative z-10 max-w-xl">
            <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg mb-6 inline-block tracking-widest uppercase">
              {aiPromoAd.type.toUpperCase()}
            </span>
            <h2 className="text-5xl font-black text-white mb-6 leading-tight">
              {aiPromoAd.title}
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
              {aiPromoAd.description}
            </p>
            {aiPromoAd.link && (
              <a 
                href={aiPromoAd.link}
                className="bg-white text-foreground text-dynamic-shadow px-10 py-4 rounded-2xl font-black hover:bg-rose-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl inline-block"
              >
                Learn More
              </a>
            )}
          </div>
        ) : (
          <div className="relative z-10 max-w-xl">
            <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg mb-6 inline-block tracking-widest uppercase">Limited Time Offer</span>
            <h2 className="text-5xl font-black text-white mb-6 leading-tight">Get 20% off your first AI-planned adventure</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">Use code <span className="text-white font-bold">SUMMER24</span> at checkout and let our AI craft your perfect getaway.</p>
            <Link href={'/ai-trip-planner'}  className="bg-white text-foreground text-dynamic-shadow px-10 py-4 rounded-2xl font-black hover:bg-rose-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl inline-block">
              Learn More
            </Link>
          </div>
        )}
        
        {aiPromoAd?.imageUrl && (
          <div className="absolute inset-0 z-0">
             <Image src={aiPromoAd.imageUrl} alt="Promo Background" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
          </div>
        )}
        
        <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-rose-500/20 rounded-full blur-[100px] group-hover:bg-rose-500/30 transition-all duration-700"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
    </section>
  );
};