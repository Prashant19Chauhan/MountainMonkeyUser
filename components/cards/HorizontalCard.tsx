// @/components/cards/HorizontalCard.tsx
import React from 'react';
import { Heart } from 'lucide-react'; 
import Link from 'next/link';

export const HorizontalCard = ({ title, location, price, image, id }: any) => {
  return (
    <Link 
      href={`/activities/${id}`}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[16/10] bg-gray-100 rounded-[32px] mb-4 overflow-hidden">
        <button
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white z-10"
        >
          <Heart className="w-4 h-4" />
        </button>
        <img 
          src={image || "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      <div className="flex justify-between px-1">
        <div>
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="text-slate-500 text-sm">{location}</p>
        </div>
        <span className="font-black">₹{price}</span>
      </div>
    </Link>
  );
};