import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface PackageCardProps {
  title?: string;
  location?: string;
  price?: number;
  duration?: string;
  tag?: string;
  image?: string;
  slug?: string;
}

export const PackageCard = ({ title, location, price, duration, tag, image, slug }: PackageCardProps) => {
  return (
    <Link 
      href={`/packages/${slug}`}
      className="min-w-[285px] sm:min-w-[380px] group cursor-pointer snap-start"
    >
      <div className="relative aspect-[4/5] bg-slate-100 rounded-[40px] overflow-hidden mb-6 shadow-xl shadow-slate-200/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-rose-500/20 group-hover:-translate-y-2">
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
          <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-sm border border-white/50">{duration}</span>
          <span className="bg-rose-500/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-sm shadow-rose-200">{tag}</span>
        </div>
        
        <button
          className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white hover:text-rose-500 transition-all duration-300 z-10 border border-white/20 hover:border-white shadow-lg"
        >
          <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
        </button>

        <img 
          src={image || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="px-2 flex justify-between items-end">
        <div>
          <h3 className="font-black text-xl text-slate-900 group-hover:text-rose-500 transition-colors leading-tight mb-1">{title}</h3>
          <p className="text-slate-400 text-sm font-bold tracking-tight">{location}</p>
        </div>
        <div className="text-right">
          <span className="text-slate-400 text-[10px] font-black block uppercase tracking-widest mb-0.5">STARTING</span>
          <p className="font-black text-2xl text-slate-900">₹{price}</p>
        </div>
      </div>
    </Link>
  );
};