import React from 'react';
import { Sparkles } from 'lucide-react';

type StayOverviewProps = {
  stay: any;
};

export const StayOverview = ({ stay }: StayOverviewProps) => {
  return (
    <div className="space-y-10">
      {/* AI Scorecard Parameters Metrics */}
      {stay.aiScore && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-black text-xs text-slate-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-600" /> Ghumakkad Go Verified Audit
            </div>
            <span className="bg-blue-600 text-white font-bold text-[9px] px-2 py-0.5 rounded uppercase">AI Scorecard</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(stay.aiScore).map(([key, val]) => (
              <div key={key} className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-lg font-black text-slate-800 block mt-0.5">{String(val)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* About Stay */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">About the Experience</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
          {stay.longDescription || stay.shortDescription}
        </p>
      </div>
    </div>
  );
};
