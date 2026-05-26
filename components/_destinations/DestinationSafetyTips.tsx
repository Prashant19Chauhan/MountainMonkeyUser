import React from 'react';
import { ShieldCheck, Info, Check, X } from 'lucide-react';
import { LocalInfo, EmergencyContact } from '@/types/type';

type DestinationSafetyTipsProps = {
  localInfo: LocalInfo;
};

export const DestinationSafetyTips = ({ localInfo }: DestinationSafetyTipsProps) => {
  if (!localInfo) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Safety Tips */}
      {localInfo.safety && (
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Safety Tips</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            {localInfo.safety.tips?.slice(0, 3).map((tip: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <Check size={16} className="text-blue-500 shrink-0 mt-0.5"/> {tip}
              </li>
            ))}
          </ul>
          {localInfo.safety?.emergencyContacts && localInfo.safety.emergencyContacts.length > 0 && (
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-xs font-bold text-slate-700 mb-2">Emergency Contacts:</p>
              {localInfo.safety?.emergencyContacts?.map((contact: EmergencyContact) => (
                <p key={contact.number} className="text-xs text-slate-600">
                  {contact.authority}: {contact.number}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Do's and Don'ts */}
      <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
            <Info size={20} />
          </div>
          <h3 className="font-bold text-slate-900">Do's & Don'ts</h3>
        </div>
        <div className="space-y-3 text-sm">
          {localInfo.dos?.slice(0, 3).map((doItem: string, index: number) => (
            <div key={index} className="flex items-start gap-2">
              <Check size={16} className="text-green-500 shrink-0 mt-0.5"/> 
              <span className="text-slate-600">{doItem}</span>
            </div>
          ))}
          {localInfo.donts?.slice(0, 2).map((dontItem: string, index: number) => (
            <div key={index} className="flex items-start gap-2">
              <X size={16} className="text-red-500 shrink-0 mt-0.5"/> 
              <span className="text-slate-600">{dontItem}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
