import React from 'react';
import { Sparkles } from 'lucide-react';

type DetailOverviewProps = {
  activity: any;
};

export const DetailOverview = ({ activity }: DetailOverviewProps) => {
  return (
    <div className="space-y-8">
      {/* Experience Description */}
      <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs space-y-4">
        <h3 className="text-lg font-black text-slate-900">Experience Overview</h3>
        <p className="text-slate-600 leading-relaxed text-sm text-justify">
          {activity.longDescription || activity.shortDescription}
        </p>
      </section>

      {/* Dynamic AI Score Parameters */}
      {activity.aiScore && (
        <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-2xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">Ghumakkad Go Intelligent Assessment</h4>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {Object.entries(activity.aiScore).map(([key, val]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-slate-900 font-extrabold">{String(val)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${String(val)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
