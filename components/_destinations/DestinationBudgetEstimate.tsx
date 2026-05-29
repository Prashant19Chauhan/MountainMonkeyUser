"use client";

import React, { useState } from 'react';
import { DollarSign, Calendar } from 'lucide-react';
import { Destination } from '@/types/type';

type DestinationBudgetEstimateProps = {
  destination: Destination;
  onPlanTrip: () => void;
};

export const DestinationBudgetEstimate = ({ destination, onPlanTrip }: DestinationBudgetEstimateProps) => {
  const [budgetTier, setBudgetTier] = useState<'dailyAvg' | 'budget' | 'luxury'>('dailyAvg');

  if (!destination.budgetEstimate) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-emerald-500" /> Budget Estimate
        </h3>
        <span className="text-[9px] bg-blue-50 text-blue-600 border border-blue-100 font-bold px-2 py-0.5 rounded">
          Per Person
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-500">
        {(['budget', 'dailyAvg', 'luxury'] as const).map((tier) => (
          <button
            key={tier}
            type="button"
            onClick={() => setBudgetTier(tier)}
            className={`py-1.5 text-center capitalize rounded-lg transition cursor-pointer ${budgetTier === tier ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-800'
              }`}
          >
            {tier === 'dailyAvg' ? 'Moderate' : tier}
          </button>
        ))}
      </div>

      <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
        <span className="text-xs text-slate-500 font-medium tracking-wide block">
          Estimated Cost
        </span>
        <span className="text-4xl font-black text-slate-900 block mt-1">
          ₹{destination.budgetEstimate[budgetTier]?.toLocaleString('en-IN') || 'N/A'}
          <span className="text-xs text-slate-400 font-normal">
            /{budgetTier === 'dailyAvg' ? 'day' : 'trip'}
          </span>
        </span>
      </div>

      <button 
        type="button" 
        onClick={onPlanTrip}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-blue-100 cursor-pointer"
      >
        <Calendar className="w-4 h-4" /> Plan Your Trip
      </button>
    </div>
  );
};
