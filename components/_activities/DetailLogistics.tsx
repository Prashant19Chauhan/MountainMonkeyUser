import React from 'react';
import { Clock, Zap, Smartphone, MessageSquare } from 'lucide-react';

type DetailLogisticsProps = {
  activity: any;
};

export const DetailLogistics = ({ activity }: DetailLogisticsProps) => {
  const durationHours = activity?.timing?.duration ? Math.ceil(activity.timing.duration / 60) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-100 p-5 rounded-2xl text-xs font-bold text-slate-700 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Clock className="w-5 h-5" /></div>
          <div>
            <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Duration</span>
            <span>{durationHours > 0 ? `${durationHours} Hours` : `${activity.timing?.duration} Mins`}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 text-amber-500 rounded-lg"><Zap className="w-5 h-5" /></div>
          <div>
            <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Time Preference</span>
            <span className="capitalize">{activity.timeSlotPreference?.join(', ') || "Flexible"}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Smartphone className="w-5 h-5" /></div>
          <div>
            <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Age Bracket</span>
            <span>{activity.ageLimit?.min || 0} - {activity.ageLimit?.max || 99} Yrs</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><MessageSquare className="w-5 h-5" /></div>
          <div>
            <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Difficulty</span>
            <span className="capitalize">{activity.difficultyLevel || "Easy"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
