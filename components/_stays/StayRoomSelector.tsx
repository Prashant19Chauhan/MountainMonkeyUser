import React from 'react';
import { StayRoom } from '@/types/type';

type StayRoomSelectorProps = {
  roomsList: StayRoom[];
  selectedRoomIndex: number;
  setSelectedRoomIndex: (index: number) => void;
};

export const StayRoomSelector = ({ 
  roomsList, 
  selectedRoomIndex, 
  setSelectedRoomIndex 
}: StayRoomSelectorProps) => {
  if (roomsList.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Step 1: Choose Your Room Style</h3>
        <p className="text-xs text-slate-400 mt-0.5">Select a style framework to configure pricing ledger rules dynamically</p>
      </div>
      
      <div className="space-y-3">
        {roomsList.map((room: StayRoom, idx: number) => (
          <div 
            key={idx}
            onClick={() => setSelectedRoomIndex(idx)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer grid sm:grid-cols-12 gap-4 items-center ${
              selectedRoomIndex === idx 
                ? 'border-blue-600 bg-blue-50/20 shadow-2xs' 
                : 'border-slate-100 bg-white hover:border-slate-200'
            }`}
          >
            <div className="sm:col-span-7 space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-slate-800 text-base">{room.typeOfRoom}</h4>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded">Cap: {room.capacity} Pax</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {room.amenities?.map((am: string, i: number) => (
                  <span key={i} className="text-[10px] bg-white text-slate-500 font-medium px-2 py-0.5 rounded border border-slate-100">{am}</span>
                ))}
              </div>
            </div>
            <div className="sm:col-span-5 text-left sm:text-right flex sm:flex-col justify-between items-center sm:items-end gap-1">
              <div>
                <span className="text-base font-black text-slate-900">₹{room.pricePerNight?.min}</span>
                <span className="text-[10px] text-slate-400">/night</span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold px-2 py-0.5 rounded">
                {room.availability?.availableRooms || 0} Available Units
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
