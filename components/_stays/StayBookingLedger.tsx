import React, { useState, useEffect } from 'react';
import { Star, BedDouble } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { EnquiryModal } from '../cards/EnquiryModal';

import { Stay, StayRoom } from '@/types/type';

type StayBookingLedgerProps = {
  stay: Stay;
  selectedRoom: StayRoom;
};

export const StayBookingLedger = ({ stay, selectedRoom }: StayBookingLedgerProps) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, user } = useAppSelector(state => state.user);

  useEffect(() => {
    if (searchParams.get("openEnquiry") === "true") {
      setIsEnquiryModalOpen(true);
      // Clean query params
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

  if (!selectedRoom) return null;

  const activePrice = selectedRoom.currentPrice || selectedRoom.pricePerNight?.min || stay.priceRange?.min || 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6">
      
      <div className="flex justify-between items-baseline">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">₹{activePrice}</span>
            {selectedRoom.currentPrice && selectedRoom.pricePerNight?.min && selectedRoom.currentPrice < selectedRoom.pricePerNight.min && (
              <span className="text-xs text-slate-400 line-through">
                ₹{selectedRoom.pricePerNight.min}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-slate-500 block mt-0.5">/ night</span>
        </div>
        <div className="flex items-center gap-0.5 text-xs font-bold text-slate-800">
          <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" /> {stay.ratings?.average || "New"}
        </div>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
        <BedDouble className="w-4 h-4 text-blue-600" />
        <div>
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Configured Profile</span>
          <span className="text-xs font-black text-slate-800">{selectedRoom.typeOfRoom}</span>
        </div>
      </div>

      <div className="border border-slate-300 rounded-xl overflow-hidden text-xs">
        <div className="grid grid-cols-2 border-b border-slate-300">
          <div className="p-3 border-r border-slate-300 space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-800 block">Check-In</label>
            <input 
              type="date" 
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full bg-transparent focus:outline-none font-bold text-slate-600 cursor-pointer"
            />
          </div>
          <div className="p-3 space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-800 block">Check-Out</label>
            <input 
              type="date" 
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full bg-transparent focus:outline-none font-bold text-slate-600 cursor-pointer"
            />
          </div>
        </div>
        <div className="p-3 space-y-1">
          <label className="text-[9px] font-black uppercase text-slate-800 block">Explorers Count</label>
          <div className="flex justify-between items-center pt-0.5">
            <span className="font-bold text-slate-700">{guestCount} Guest{guestCount > 1 && 's'}</span>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))} 
                className="w-6 h-6 bg-slate-100 font-bold rounded flex items-center justify-center border border-slate-200 shadow-2xs cursor-pointer hover:bg-slate-200"
              >
                -
              </button>
              <button 
                type="button"
                onClick={() => setGuestCount(Math.min(selectedRoom.capacity || 2, guestCount + 1))} 
                className="w-6 h-6 bg-slate-100 font-bold rounded flex items-center justify-center border border-slate-200 shadow-2xs cursor-pointer hover:bg-slate-200"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <button 
        type="button"
        onClick={() => {
          if (!isAuthenticated) {
            const redirectPath = encodeURIComponent(window.location.pathname + window.location.search);
            router.push(`/login?redirect=${redirectPath}&openEnquiry=true`);
          } else {
            setIsEnquiryModalOpen(true);
          }
        }}
        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm py-3.5 rounded-xl transition shadow-md shadow-rose-100 cursor-pointer"
      >
        Reserve Lodging Unit
      </button>

      <div className="space-y-2.5 pt-3 text-xs border-t border-slate-100 font-medium text-slate-500">
        <div className="flex justify-between">
          <span className="underline">Base Fare Subtotal</span>
          <span className="text-slate-900 font-bold">₹{activePrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="underline">Ghumakkad Go Processing Fee</span>
          <span className="text-emerald-600 font-bold">FREE</span>
        </div>
        <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
          <span>Estimated Net Total</span>
          <span>₹{activePrice}</span>
        </div>
      </div>

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        user={user}
        enquiryData={{
          enquiryType: 'stay',
          itemId: stay._id || '',
          itemTitle: stay.name || '',
          checkInDate: checkInDate || undefined,
          checkOutDate: checkOutDate || undefined,
          numberOfGuests: guestCount,
          roomType: selectedRoom.typeOfRoom
        }}
      />

    </div>
  );
};
