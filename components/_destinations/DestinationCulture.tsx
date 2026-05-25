import React from 'react';
import { Sparkles } from 'lucide-react';

type DestinationCultureProps = {
  localInfo: any;
};

export const DestinationCulture = ({ localInfo }: DestinationCultureProps) => {
  if (!localInfo?.culture) return null;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <h3 className="font-bold text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-amber-500" /> Culture & Festivals
      </h3>
      <div className="space-y-3">
        {localInfo.culture.festivals?.slice(0, 3).map((festival: any, index: any) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-slate-700">{festival}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
