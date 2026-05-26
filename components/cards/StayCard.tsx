import React from 'react';
import { Heart } from 'lucide-react';

interface StayCardProps {
  title?: string;
  location?: string;
  price?: number;
  image?: string;
}

export const StayCard = ({ title, location, price, image }: StayCardProps) => {
  return (
    <div className="group">
      <div className="relative aspect-[16/9] bg-gray-100 rounded-[40px] mb-4 overflow-hidden">
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-5 right-5 p-2 bg-white/20 backdrop-blur-md rounded-full text-white z-10 cursor-pointer"
        >
          <Heart className="w-5 h-5" />
        </div>
        <img 
          src={image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      <div className="flex justify-between items-start px-2">
        <div>
          <h4 className="font-bold text-xl">{title}</h4>
          <p className="text-slate-500 text-sm mt-0.5">{location}</p>
        </div>
        <span className="font-black text-lg">₹{price}/night</span>
      </div>
    </div>
  );
};
