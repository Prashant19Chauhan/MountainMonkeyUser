import React from 'react';
import { Info, ShieldCheck, Check, X, CheckCircle2, XCircle } from 'lucide-react';

type PackageSafetyTipsProps = {
  packageDetails: any;
  localInfo: any;
};

export const PackageSafetyTips = ({ packageDetails, localInfo }: PackageSafetyTipsProps) => {
  return (
    <div className="space-y-12">
      {/* Important Info & Policies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Local Tips & Safety */}
        {localInfo && (
          <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Info size={20} />
            </div>
            <h3 className="font-bold text-gray-900 mb-4">Local Tips & Safety</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {localInfo.dos?.slice(0, 3).map((doItem: any, index: any) => (
                <li key={index} className="flex items-start gap-2">
                  <Check size={16} className="text-blue-500 shrink-0 mt-0.5"/> {doItem}
                </li>
              ))}
              {localInfo.donts?.slice(0, 2).map((dontItem: any, index: any) => (
                <li key={index} className="flex items-start gap-2">
                  <X size={16} className="text-red-500 shrink-0 mt-0.5"/> {dontItem}
                </li>
              ))}
            </ul>
            {localInfo.safety?.emergencyContacts && localInfo.safety.emergencyContacts.length > 0 && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs font-bold text-gray-700 mb-2">Emergency Contacts:</p>
                {localInfo.safety.emergencyContacts.map((contact: any) => (
                  <p key={contact._id} className="text-xs text-slate-600">
                    {contact.authority}: {contact.number}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Cancellation Policy */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-bold text-gray-900 mb-4">Cancellation Policy</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 shrink-0"></div>
              <div>
                <p className="font-bold text-gray-900">Free Cancellation</p>
                <p className="text-gray-500 text-xs">Up to 30 days before departure. Get a full refund.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 shrink-0"></div>
              <div>
                <p className="font-bold text-gray-900">Partial Refund</p>
                <p className="text-gray-500 text-xs">Cancel between 15-30 days for 50% refund.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
              <div>
                <p className="font-bold text-gray-900">Non-refundable</p>
                <p className="text-gray-500 text-xs">Less than 15 days, no refunds provided.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included / Excluded */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-green-600 flex items-center gap-2 mb-4">
              <CheckCircle2 size={18} /> Included
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {packageDetails.inclusions.map((inclusion: any, index: any) => (
                <li key={index} className="flex items-center gap-2">
                  <Check size={16} className="text-green-500"/> {inclusion}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-red-500 flex items-center gap-2 mb-4">
              <XCircle size={18} /> Excluded
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {packageDetails.exclusions.map((exclusion: any, index: any) => (
                <li key={index} className="flex items-center gap-2">
                  <X size={16} className="text-red-400"/> {exclusion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
