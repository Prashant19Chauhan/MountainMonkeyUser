import React from 'react';
import { HardHat, AlertTriangle, Check } from 'lucide-react';
import { Activity } from '@/types/type';

type DetailChecklistsProps = {
  activity: Activity;
};

export const DetailChecklists = ({ activity }: DetailChecklistsProps) => {
  const requiredItems = activity.requiredItems ?? [];
  const precautions = activity.safetyInfo?.precautions ?? [];
  const riskLevel = activity.safetyInfo?.riskLevel;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {requiredItems.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <HardHat className="w-4 h-4 text-blue-500" /> Mandatory Checklist
          </h4>
          <ul className="space-y-2 text-xs text-slate-600 font-bold">
            {requiredItems.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {precautions.length > 0 && (
        <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-100 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> Safety Constraints (Risk: {riskLevel})
          </h4>
          <ul className="space-y-2 text-xs text-amber-800/90 font-medium">
            {precautions.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
