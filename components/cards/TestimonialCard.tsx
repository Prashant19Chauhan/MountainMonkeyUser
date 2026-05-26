
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name?: string;
  text?: string;
  rating?: number;
}

export const TestimonialCard = ({ name, text, rating }: TestimonialCardProps) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col justify-between">
    <div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3 h-3 ${i < (rating || 5) ? 'fill-rose-400 text-rose-400' : 'fill-slate-200 text-slate-200'}`} 
          />
        ))}
      </div>
      <p className="text-sm text-slate-600 italic mb-6">{`"${text}"`}</p>
    </div>
    <div className="flex items-center gap-3 mt-auto">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center text-rose-500 font-bold text-xs">
        {name?.charAt(0) || "MM"}
      </div>
      <span className="font-bold text-sm">{name}</span>
    </div>
  </div>
);