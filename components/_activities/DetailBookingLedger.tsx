import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { EnquiryModal } from '../cards/EnquiryModal';
import { Activity } from '@/types/type';

type DetailBookingLedgerProps = {
  basePrice: number;
  activity: Activity;
};

export const DetailBookingLedger = ({ basePrice, activity }: DetailBookingLedgerProps) => {
  const [targetDate, setTargetDate] = useState('');
  const [pax, setPax] = useState(1);
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

  const handleEnquiryTrigger = () => {
    if (!isAuthenticated) {
      const redirectPath = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/login?redirect=${redirectPath}&openEnquiry=true`);
    } else {
      setIsEnquiryModalOpen(true);
    }
  };

  const activePrice = activity?.currentPrice || basePrice;

  return (
    <div className="lg:sticky lg:top-28">
      <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-6 space-y-5">
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Starting from</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black text-slate-900">₹{activePrice * pax}</span>
              {activity?.currentPrice && basePrice && activity.currentPrice < basePrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{basePrice * pax}
                </span>
              )}
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg flex items-center gap-0.5 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" /> Best Price
          </span>
        </div>

        <hr className="border-slate-100" />

        {/* Inline Transaction Execution Inputs Form */}
        <div className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-500 block">Select Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-500 block">Headcount Parameters</label>
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
              <span className="text-xs font-black text-slate-700">{pax} {pax > 1 ? 'Explorers' : 'Explorer'}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPax(Math.max(1, pax - 1))}
                  className="w-7 h-7 bg-white border border-slate-200 shadow-2xs font-black rounded flex items-center justify-center text-sm hover:bg-slate-50 cursor-pointer"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setPax(pax + 1)}
                  className="w-7 h-7 bg-white border border-slate-200 shadow-2xs font-black rounded flex items-center justify-center text-sm hover:bg-slate-50 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price Calculations Breakdown Block Ledger */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-medium space-y-1.5 text-slate-500">
          <div className="flex justify-between">
            <span>Base Operator Plan</span>
            <span>₹{activePrice} x {pax}</span>
          </div>
          <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-1 border-t border-slate-200/60">
            <span>Subtotal Checkout</span>
            <span>₹{activePrice * pax}</span>
          </div>
        </div>

        {/* Checkout Trigger */}
        <button
          type="button"
          onClick={handleEnquiryTrigger}
          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm py-4 rounded-xl transition shadow-md shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4.5 h-4.5" /> Secure Activity Pass
        </button>

        <div className="text-center">
          <span className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Free Cancellation up to 24h prior
          </span>
        </div>
      </div>

      <div className="mt-4 text-center p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs">
        <span className="text-slate-500 font-medium">Planning corporate travels or private events?</span>
        <button
          type="button"
          onClick={handleEnquiryTrigger}
          className="font-bold text-blue-600 underline block mx-auto mt-0.5 hover:text-blue-700 cursor-pointer bg-transparent border-0"
        >
          Submit Custom Group Enquiry
        </button>
      </div>

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        user={user}
        enquiryData={{
          enquiryType: 'activity',
          itemId: activity?._id || '',
          itemTitle: activity?.name || '',
          checkInDate: targetDate || undefined,
          checkOutDate: undefined,
          numberOfGuests: pax
        }}
      />

    </div>
  );
};
