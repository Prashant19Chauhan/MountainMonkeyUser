import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const DestinationVerifiedFooter = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 pb-16">
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl grid md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 space-y-2">
          <h4 className="text-base font-black flex items-center gap-2 text-white uppercase tracking-wider text-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Verified Information
          </h4>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            All destination information, pricing, and local data are regularly updated and verified through trusted sources. 
            Actual prices and availability may vary based on season and demand.
          </p>
        </div>
        <div className="flex md:justify-end">
          <button type="button" className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs px-5 py-3 rounded-xl transition shadow-xs w-full sm:w-auto cursor-pointer">
            Download Guide
          </button>
        </div>
      </div>
    </div>
  );
};
