import React from 'react';
import { 
  Wifi, Waves, Car, Dumbbell, Heart, Utensils, GlassWater, Coffee, 
  Wind, Tv, Flame, Compass, Smile, Flower, Shield, CheckCircle2 
} from 'lucide-react';
import { Stay } from '@/types/type';

type StayAmenitiesProps = {
  stay: Stay;
};

const getAmenityIcon = (name: string) => {
  const cleanName = name.toLowerCase().trim();
  if (cleanName.includes('wifi')) return <Wifi className="w-4 h-4 text-blue-500 flex-shrink-0" />;
  if (cleanName.includes('pool')) return <Waves className="w-4 h-4 text-cyan-500 flex-shrink-0" />;
  if (cleanName.includes('park')) return <Car className="w-4 h-4 text-amber-500 flex-shrink-0" />;
  if (cleanName.includes('gym')) return <Dumbbell className="w-4 h-4 text-indigo-500 flex-shrink-0" />;
  if (cleanName.includes('spa')) return <Heart className="w-4 h-4 text-pink-500 flex-shrink-0" />;
  if (cleanName.includes('restaur')) return <Utensils className="w-4 h-4 text-rose-500 flex-shrink-0" />;
  if (cleanName.includes('bar')) return <GlassWater className="w-4 h-4 text-violet-500 flex-shrink-0" />;
  if (cleanName.includes('service')) return <Coffee className="w-4 h-4 text-amber-600 flex-shrink-0" />;
  if (cleanName.includes('ac') || cleanName.includes('air')) return <Wind className="w-4 h-4 text-sky-400 flex-shrink-0" />;
  if (cleanName.includes('tv')) return <Tv className="w-4 h-4 text-blue-600 flex-shrink-0" />;
  if (cleanName.includes('heat') || cleanName.includes('fire') || cleanName.includes('bon')) return <Flame className="w-4 h-4 text-orange-500 flex-shrink-0" />;
  if (cleanName.includes('guid') || cleanName.includes('trek')) return <Compass className="w-4 h-4 text-emerald-500 flex-shrink-0" />;
  if (cleanName.includes('kid') || cleanName.includes('play')) return <Smile className="w-4 h-4 text-yellow-500 flex-shrink-0" />;
  if (cleanName.includes('break')) return <Coffee className="w-4 h-4 text-orange-400 flex-shrink-0" />;
  if (cleanName.includes('garden')) return <Flower className="w-4 h-4 text-green-500 flex-shrink-0" />;
  if (cleanName.includes('wheel') || cleanName.includes('access')) return <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />;
  
  return <CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0" />;
};

export const StayAmenities = ({ stay }: StayAmenitiesProps) => {
  if (!stay.amenities || stay.amenities.length === 0) return null;

  return (
    <div className="space-y-4 font-sans">
      <h3 className="text-xl font-bold text-slate-900">Resort Core Accommodations</h3>
      <div className="grid grid-cols-2 gap-3">
        {stay.amenities.map((am: string, idx: number) => (
          <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-bold bg-slate-50 p-3 rounded-xl border border-slate-100/50 hover:bg-slate-100/40 transition-colors">
            {getAmenityIcon(am)}
            <span className="capitalize">{am.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
