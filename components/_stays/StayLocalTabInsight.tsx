"use client";

import React, { useState } from 'react';
import { Compass, Utensils, Landmark, Shirt, ShieldAlert, PhoneCall } from 'lucide-react';
import { LocalInfo, LocalFoodItem, FamousPlaceItem, EmergencyContact } from '@/types/type';

type StayLocalTabProps = {
  localInfo: LocalInfo;
};

export const StayLocalTabInsight = ({ localInfo }: StayLocalTabProps) => {
  const [activeLocalTab, setActiveLocalTab] = useState<'food' | 'places' | 'culture' | 'safety' | 'clothing'>('food');

  if (!localInfo) return null;

  // Extract optional arrays to defined locals so TS can narrow them
  const summerClothing = localInfo.clothing?.summer ?? [];
  const winterClothing = localInfo.clothing?.winter ?? [];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xl space-y-6">
      <div>
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Compass className="w-5 h-5 text-purple-600" /> Localized Hub Parameters
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Regional travel criteria synchronized dynamically via Ghumakkad Go data networks</p>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-100 scrollbar-none">
        {[
          { id: 'food', label: 'Famous Food', icon: <Utensils className="w-3.5 h-3.5" /> },
          { id: 'places', label: 'Local Spots', icon: <Landmark className="w-3.5 h-3.5" /> },
          { id: 'clothing', label: 'Clothing', icon: <Shirt className="w-3.5 h-3.5" /> },
          { id: 'safety', label: 'Emergency Guard', icon: <ShieldAlert className="w-3.5 h-3.5" /> }
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveLocalTab(t.id as 'food' | 'places' | 'culture' | 'safety' | 'clothing')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeLocalTab === t.id 
                ? 'border-purple-600 text-purple-600' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="pt-2 text-sm text-slate-600 min-h-[100px]">
        {activeLocalTab === 'food' && localInfo.famousFood && (
          <div className="grid gap-4 sm:grid-cols-2">
            {localInfo.famousFood.map((f: LocalFoodItem, i: number) => (
              <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-extrabold text-slate-900 text-sm">{f.name}</span>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-purple-50 text-purple-600">{f.type}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeLocalTab === 'places' && localInfo.famousPlaces && (
          <div className="space-y-3">
            {localInfo.famousPlaces.map((p: FamousPlaceItem, i: number) => (
              <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center gap-4">
                <div>
                  <span className="font-extrabold text-slate-900 text-sm">{p.name}</span>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.description}</p>
                </div>
                <span className="text-xs font-black bg-white px-2.5 py-1 rounded border border-slate-200 flex-shrink-0 text-slate-800">
                  {(p.entryFee || 0) > 0 ? `₹${p.entryFee}` : 'Free Entry'}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeLocalTab === 'clothing' && localInfo.clothing && (
          <div className="grid gap-4 sm:grid-cols-2 text-xs font-bold text-slate-700">
            {summerClothing.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Summer Wardrobe</span>
                <p className="text-slate-800">{summerClothing.join(', ')}</p>
              </div>
            )}
            {winterClothing.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Winter Wardrobe</span>
                <p className="text-slate-800">{winterClothing.join(', ')}</p>
              </div>
            )}
          </div>
        )}

        {activeLocalTab === 'safety' && localInfo.safety && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-xs font-bold">
              <span className="text-emerald-900">Overall Regional Safety Score</span>
              <span className="font-black text-emerald-700 bg-white px-2.5 py-0.5 rounded shadow-2xs">{localInfo.safety?.overallSafety} / 10</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {localInfo.safety?.emergencyContacts?.map((c: EmergencyContact, i: number) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] font-black uppercase text-slate-400 block">{c.authority}</span>
                    <span className="text-xs font-extrabold text-slate-800">{c.number}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
