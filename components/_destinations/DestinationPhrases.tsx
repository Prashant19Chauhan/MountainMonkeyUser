import React from 'react';
import { Languages } from 'lucide-react';

type DestinationPhrasesProps = {
  localInfo: any;
};

export const DestinationPhrases = ({ localInfo }: DestinationPhrasesProps) => {
  if (!localInfo?.phrases || localInfo.phrases.length === 0) return null;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <h3 className="font-bold text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
        <Languages className="w-4 h-4 text-purple-500" /> Useful Phrases
      </h3>
      <div className="space-y-2">
        {localInfo.phrases.slice(0, 4).map((phrase: any) => (
          <div key={phrase._id} className="p-3 bg-slate-50/60 rounded-xl text-xs border border-slate-100/50">
            <div className="font-bold text-slate-800">{phrase.local}</div>
            <div className="text-slate-500 text-[10px]">{phrase.english}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
