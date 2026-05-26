import React from 'react';
import { Stay } from '@/types/type';

type StayPhotoMeshProps = {
  stay: Stay;
};

export const StayPhotoMesh = ({ stay }: StayPhotoMeshProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-3 h-[30vh] md:h-[45vh] rounded-2xl overflow-hidden mt-2 relative">
      <div className="md:col-span-2 h-full relative overflow-hidden bg-slate-100">
        {stay.images && stay.images[0] ? (
          <img src={stay.images[0]} alt="Main Stay Frame" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-600 font-bold">Photo Hub Offline</div>
        )}
      </div>
      <div className="hidden md:grid grid-cols-2 col-span-2 gap-3 h-full">
        {stay.images?.slice(1, 5).map((img: string, idx: number) => (
          <div key={idx} className="relative overflow-hidden h-full bg-slate-50">
            <img src={img} alt={`Gallery Cell ${idx}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};
