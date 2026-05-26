"use client";

import React, { useState } from 'react';
import { 
  Map, Utensils, Landmark, HelpCircle as LocalIcon, 
  Shirt, ShieldAlert, PhoneCall, Sparkles 
} from 'lucide-react';
import { LocalInfo, LocalFoodItem, FamousPlaceItem, EmergencyContact } from '@/types/type';

type DetailInsightMatrixProps = {
  localInfo: LocalInfo;
};

export const DetailInsightMatrix = ({ localInfo }: DetailInsightMatrixProps) => {
  const [activeLocalTab, setActiveLocalTab] = useState<'food' | 'places' | 'culture' | 'safety' | 'clothing'>('food');

  if (!localInfo) return null;

  // Extract optional arrays to defined locals so TS can narrow them
  const summerClothing = localInfo.clothing?.summer ?? [];
  const religiousPlaces = localInfo.clothing?.religiousPlaces ?? [];

  return (
    <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-2xs space-y-6">
      <div>
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Map className="w-5 h-5 text-purple-600" /> Destination Insight Matrix
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Real localized documentation synced dynamically via Ghumakkad Go records database frameworks</p>
      </div>

      {/* Sub-Tab Filters Context Controls */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-100 scrollbar-none">
        {[
          { id: 'food', label: 'Famous Food', icon: <Utensils className="w-3.5 h-3.5" /> },
          { id: 'places', label: 'Local Hub Hubs', icon: <Landmark className="w-3.5 h-3.5" /> },
          { id: 'culture', label: 'Traditions', icon: <LocalIcon className="w-3.5 h-3.5" /> },
          { id: 'clothing', label: 'Clothing Tips', icon: <Shirt className="w-3.5 h-3.5" /> },
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

      {/* Content Panel Modules Switch Container */}
      <div className="pt-2 text-sm text-slate-600 min-h-[120px]">
        
        {activeLocalTab === 'food' && localInfo.famousFood && (
          <div className="grid gap-4 sm:grid-cols-2">
            {localInfo.famousFood.map((f: LocalFoodItem, i: number) => (
              <div key={i} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100/70 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-extrabold text-slate-900 text-sm">{f.name}</span>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-purple-50 text-purple-600">{f.type}</span>
                </div>
                <p className="text-xs text-slate-500">{f.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeLocalTab === 'places' && localInfo.famousPlaces && (
          <div className="space-y-3">
            {localInfo.famousPlaces.map((p: FamousPlaceItem, i: number) => (
              <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100/70 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{p.name}</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-600">{p.type?.replace('_', ' ')}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{p.description}</p>
                </div>
                <div className="text-right flex-shrink-0 text-xs font-bold text-slate-700">
                  <span>Fee: {(p.entryFee || 0) > 0 ? `₹${p.entryFee}` : 'Free Entry'}</span>
                  <span className="block text-[10px] text-slate-400 font-normal">{p.timings}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeLocalTab === 'culture' && localInfo.culture && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <span className="text-xs font-black text-purple-900 uppercase tracking-wide block">Festivals & Celebrations</span>
              <div className="flex flex-wrap gap-1.5">
                {localInfo.culture.festivals?.map((item: string, i: number) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/40 font-medium flex items-center gap-1.5 w-fit">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" /> {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-black text-purple-900 uppercase tracking-wide block">Local Etiquette Norms</span>
              <ul className="space-y-1 text-xs text-slate-500 font-medium">
                {localInfo.culture.localEtiquette?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-1">· {item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeLocalTab === 'clothing' && localInfo.clothing && (
          <div className="space-y-3 text-xs font-medium">
            <div className="grid sm:grid-cols-2 gap-4">
              {summerClothing.length > 0 && (
                <div>
                  <span className="font-black text-slate-900 block mb-1">Summer Wardrobe</span>
                  <p className="text-slate-500">{summerClothing.join(', ')}</p>
                </div>
              )}
              {religiousPlaces.length > 0 && (
                <div>
                  <span className="font-black text-rose-900 block mb-1">Temples & Holy Dresscodes</span>
                  <p className="text-slate-500">{religiousPlaces.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeLocalTab === 'safety' && localInfo.safety && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
              <span className="text-xs font-bold text-emerald-900">Overall Target Area Safety Rating</span>
              <span className="font-black text-emerald-700 bg-white px-2.5 py-0.5 rounded shadow-2xs text-xs">{localInfo.safety?.overallSafety} / 10 Matrix</span>
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Emergency Speed Dials</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {localInfo.safety.emergencyContacts?.map((c: EmergencyContact, i: number) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block truncate">{c.authority}</span>
                      <span className="text-xs font-extrabold text-slate-800">{c.number}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
