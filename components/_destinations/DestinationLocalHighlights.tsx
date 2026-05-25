import React from 'react';
import { Sun, Wallet, Languages, ShieldCheck } from 'lucide-react';

type DestinationLocalHighlightsProps = {
  localInfo: any;
};

export const DestinationLocalHighlights = ({ localInfo }: DestinationLocalHighlightsProps) => {
  if (!localInfo) return null;

  return (
    <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 pt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-100 p-5 rounded-2xl text-xs font-bold text-slate-700 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl"><Sun className="w-5 h-5"/></div>
          <div>
            <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Best Time</span>
            <span>{localInfo.bestTimeToVisit}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Wallet className="w-5 h-5"/></div>
          <div>
            <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Currency</span>
            <span className="truncate block max-w-[130px]">{localInfo.currency}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl"><Languages className="w-5 h-5"/></div>
          <div>
            <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Languages</span>
            <span className="truncate block max-w-[130px]">{localInfo.language?.join(', ')}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl"><ShieldCheck className="w-5 h-5"/></div>
          <div>
            <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Safety Score</span>
            <span>{localInfo.safety?.overallSafety || 'N/A'}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
};
